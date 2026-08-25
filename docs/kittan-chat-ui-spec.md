# 「きったんとおしゃべり」UI設計書

AIエージェント(または人間)がこのドキュメントだけを読んでUIを実装できることを目的とした設計書です。
バックエンド/ドメインロジックは **実装・テスト済み** で、`lib/kittan/` と `app/api/kittan-chat/route.ts` にあります。
ロジック側の内部設計は [`lib/kittan/README.md`](../lib/kittan/README.md) を参照してください。

## 1. スコープ

### やること

- チャットUIの実装(メッセージ一覧・入力欄・送信・各種状態の表示)
- `POST /api/kittan-chat` との通信を担うクライアントフック `useKittanChat` の実装
- 既存ポートフォリオのデザイン言語(ポストイット風・手書き感)に馴染む見た目

### やらないこと(禁止)

- `lib/kittan/` 配下および `app/api/kittan-chat/route.ts` の変更。
  API契約が不都合な場合は変更せず、実装を止めて相談すること。
- 会話履歴の永続化(localStorage / sessionStorage / DB いずれも禁止)。
  会話はメモリ上のReact stateのみに保持し、リロードで消えるのが仕様です(プライバシー方針)。
- ストリーミング表示。APIは全文検査後に一括で返す設計のため、v1のUIはタイピング風演出を
  したい場合もクライアント側の演出として実装する(サーバーには手を入れない)。

## 2. API契約(確定・変更不可)

### エンドポイント

`POST /api/kittan-chat`(同一オリジン。CORSヘッダーなし)

### リクエスト

```json
{
  "messages": [
    { "role": "user", "content": "はじめまして！" },
    { "role": "assistant", "content": "はじめまして〜！きったんです🐈" },
    { "role": "user", "content": "TrainLCDってどんなアプリ？" }
  ]
}
```

サーバーが強制する制約(違反すると 400)。**クライアント側でも送信前に同じ制約を守ること**:

| 制約                | 値                                                    | 備考                                                                      |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| `messages` の並び   | `user` 始まり、`user`/`assistant` 交互、`user` 終わり | 1件だけ(`user`のみ)も可                                                   |
| 最大メッセージ数    | **20件**(往復ではなく発言単位)                        | 超える場合は古い方から **2件単位** で削って送る(交互ルールを崩さないため) |
| 1メッセージの最大長 | **500文字**(trim後)                                   | 入力欄側で制限・残り文字数表示を推奨                                      |
| 空文字              | 不可(trimして0文字はエラー)                           | 送信ボタンをdisableで防ぐ                                                 |

### レスポンス

**成功(200)**

```json
{ "reply": "電車の案内表示器をスマホで再現したアプリだよ🚃 ..." }
```

**エラー(4xx/5xx)** — すべて次の形:

```json
{ "error": { "code": "...", "message": "..." } }
```

| HTTP | `code`                             | UIでの扱い                                                                                                                                                                                                   |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | —                                  | `reply` をきったんの吹き出しとして表示                                                                                                                                                                       |
| 400  | `blocked_content`                  | **エラー扱いにしない。** `message` はきったんの口調のお断り文(例:「ごめんね、その話題にはお答えできないんだ🙏…」)なので、**通常のきったんの吹き出しとして会話に追加**し、履歴にも `assistant` 発言として残す |
| 400  | `invalid_json` / `invalid_request` | 起きるのはUIのバグ。ユーザーの入力は履歴に積んだまま、システム風の控えめなエラー表示+再送信ボタン                                                                                                            |
| 429  | `rate_limited`                     | `message` をシステム風表示。`retry-after` ヘッダー(秒)があれば送信ボタンをその秒数disable                                                                                                                    |
| 500  | `server_error`                     | `message` を表示し、**直前のユーザー発言を再送できるUI**(再試行ボタン)を出す                                                                                                                                 |
| 503  | `service_unavailable`              | 同上(混雑中の文言が `message` に入っている)                                                                                                                                                                  |

`message` はすべて日本語のユーザー向け文言なので、原則そのまま表示してよい。
ネットワークエラー(fetch自体の失敗)は 500 と同じ扱いにし、文言はUI側で用意する
(例:「通信がうまくいかなかったみたい。もう一度試してみてね🙏」)。

### 型のインポート

リクエスト/メッセージの型は再定義せず、ドメイン層から import する:

```ts
import type { ChatMessage, ChatRole } from '../lib/kittan/types';
```

## 3. クライアントフック `useKittanChat`(インターフェース確定)

通信と状態管理はUIコンポーネントから分離し、`hooks/useKittanChat.ts` に実装する。
既存フック(`hooks/usePraise.ts` など)の流儀に合わせること。

```ts
export type KittanChatStatus = 'idle' | 'sending';

export type KittanChatError = {
  /** 表示用文言。APIの error.message か、ネットワークエラー時のUI側定型文 */
  message: string;
  /** true のとき「再試行」UIを出す(429/500/503/ネットワークエラー) */
  retryable: boolean;
  /** retry-after 由来。この時刻(epoch ms)まで送信を無効化する。無ければ undefined */
  retryAt?: number;
};

export type UseKittanChatResult = {
  /** 表示すべき会話履歴(blocked_content のお断り文も assistant として含まれる) */
  messages: ChatMessage[];
  status: KittanChatStatus;
  /** 直近の失敗。次の送信成功でクリアされる */
  error: KittanChatError | null;
  /** 入力を trim して user 発言として積み、APIを呼ぶ。空文字・sending中は何もしない */
  send: (text: string) => Promise<void>;
  /** 直前に失敗した user 発言を再送する。失敗が無ければ何もしない */
  retry: () => Promise<void>;
  /** 会話を全消去して初期状態に戻す */
  reset: () => void;
};

export const useKittanChat = (): UseKittanChatResult => { ... };
```

実装上の注意:

- 送信時にAPIへ渡す `messages` は「表示履歴 + 今回のuser発言」。20件を超える場合は
  **先頭から2件単位で削って直近を送る**(表示上の履歴は消さなくてよい)。
- `blocked_content`(400)は `error` にセットせず、`message` を assistant 発言として
  `messages` に積む(§2の表のとおり)。
- 多重送信ガード: `status === 'sending'` 中の `send` は無視する。
- このフックは単体テストを書く(`fetch` を `vi.stubGlobal` でモック。
  テストは `vite-plus/test` から import。既存の `lib/kittan/*.test.ts` を参考に)。

## 4. UIコンポーネント構成(推奨)

サイトは1ページ縦積み構成(`app/page.tsx` 参照)で、各セクションは
`components/screens/*.tsx` + `useScreenVisibility` で表示時アニメーションを付けるパターン。

推奨は **独立セクション型**: `components/screens/KittanChat/` を新設し、
`app/page.tsx` の `ShareScreen` の手前に `next/dynamic` で追加する
(既存セクションと同じく `dynamic(() => import(...))`)。

```
components/screens/KittanChat/
  index.tsx        … セクション本体('use client')。TitlePostit + チャット枠
  MessageList.tsx  … 吹き出しリスト
  MessageBubble.tsx… 1件の吹き出し(user / assistant で左右・配色を分ける)
  ChatInput.tsx    … 入力欄+送信ボタン+残り文字数
```

フローティングウィジェット型(画面右下に常駐)にしたい場合も、上記の
`MessageList` / `ChatInput` / `useKittanChat` はそのまま使える構成にすること。
どちらにするか指示がなければセクション型で実装する。

### 初期表示

- 会話が空のときは、きったんからの固定の初回メッセージを**クライアント側で**表示する
  (API は呼ばない。履歴にも含めず、表示専用とする):
  「やっほー、きったんだよ🐈 ぼくのこと、なんでも聞いてね！」
- 近くに **「AIによる自動応答です。内容が正確でないことがあります」** という注記を
  常時表示すること(なりすまし防止のため必須)。

## 5. デザイン言語(既存の流儀に合わせる)

- Tailwind CSS v4。テーマトークンは `app/globals.css` に定義済み。
  `bg-theme-bg` / `bg-sub-bg` / `bg-box-bg` / `text-theme-text` / `text-heading-text` /
  `text-primary`(#008ffe)を使い、**生の色コードを新設しない**。
  ダークモードはトークン側で自動対応済み。
- ブレークポイントは `bp800:`(800px)のみ。モバイルファーストで書く。
- 見出しは `TitlePostit`(例: `<TitlePostit title="きったんと" subtitle="おしゃべり" />`)、
  装飾には `Postit` / `TinyKittenIcon` を再利用する。きったん側の吹き出しアバターには
  `TinyKittenIcon` を使う。
- 出現アニメーションは `globals.css` の既存 keyframes(`animate-fade`,
  `animate-fade-slide` など)を再利用し、新規追加は最小限に。
- 吹き出し内のテキストは `whitespace-pre-wrap` で改行を保持。絵文字が多いので
  `break-words` も付ける。Markdownレンダリングはしない(プロンプト側で
  Markdown を使わない指示済み。素のテキストとして表示)。

## 6. 入力まわりの要件

- Enter で送信、Shift+Enter で改行。**IME変換中の Enter では送信しない**
  (`KeyboardEvent.isComposing` / `keyCode === 229` をチェック。日本語入力で必須)。
- 送信中は入力欄と送信ボタンを disable にし、きったん側に「考え中」の
  インジケーター(ドット3つ等)を表示する。
- 500文字制限: 超過分は入力させない or 送信ボタンをdisableし、残り文字数を表示。
- 新しいメッセージ追加時はリスト末尾へ自動スクロール
  (ただしユーザーが上へスクロール中は強制しない)。

## 7. アクセシビリティ

- メッセージリストの追加通知領域に `aria-live="polite"` を付ける。
- 送信ボタンに `aria-label="送信"`。アイコンのみのボタンにはテキスト代替を必ず付ける。
- フォーカスリングを消さない。キーボードのみで送信まで完結できること。

## 8. 受け入れ基準(実装完了の定義)

- [ ] `vp check` と `vp test` がクリーン(既存の2件の既知エラー
      `functions/tsconfig.json` と `components/TriviaSlider.tsx` は除く)
- [ ] `useKittanChat` の単体テストがある(成功 / blocked_content / 429 /
      500 / ネットワークエラー / 20件超の切り詰め / 多重送信ガード)
- [ ] `blocked_content` がエラー表示ではなく、きったんの吹き出しとして表示される
- [ ] IME変換確定の Enter で誤送信しない
- [ ] モバイル幅(375px)と `bp800` 以上の両方でレイアウトが崩れない
- [ ] ダークモードで配色が破綻しない(トークンのみ使っていれば自動で満たせる)
- [ ] AI免責の注記が表示されている
- [ ] リロードで会話が消える(永続化していない)

## 9. 動作確認の手順

```bash
# .env.local に GEMINI_API_KEY を設定した上で
vp dev
# 別ターミナルからAPI単体を確認
curl -sS -X POST http://localhost:3000/api/kittan-chat \
  -H 'content-type: application/json' \
  -d '{"messages":[{"role":"user","content":"はじめまして！"}]}'
```

`GEMINI_API_KEY` 未設定時は 500(`server_error`)が返る。UI開発だけを進めたい場合は
`useKittanChat` のテストと Storybook 的な確認で代替し、キー設定後に通し確認する。
