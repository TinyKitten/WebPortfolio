# 「きったんとおしゃべり」ロジック

ポートフォリオの持ち主 TinyKitten(きったん)本人をモデルにした、おしゃべり相手のAIエージェントです。
このディレクトリにはロジックのみが入っています(UIは未実装)。
設計の背景と判断の記録は [docs/kittan-chat-design.md](../../docs/kittan-chat-design.md)、
UIを実装する際は [docs/kittan-chat-ui-spec.md](../../docs/kittan-chat-ui-spec.md) を参照してください。

## 全体像

```text
ブラウザ
  └─ POST /api/kittan-chat          app/api/kittan-chat/route.ts
       ├─ レートリミット             lib/kittan/rateLimit.ts
       └─ chatWithKittan()          lib/kittan/chat.ts   ← 司令塔
            ├─ validateChatRequest  lib/kittan/guardrails.ts
            ├─ screenMessages       lib/kittan/guardrails.ts  (入力・ルールベース)
            ├─ buildSystemInstruction lib/kittan/persona.ts
            │    ├─ getKittanCorpus     lib/kittan/corpus.ts   ← data/kittan/corpus.json
            │    └─ getPortfolioFacts   lib/kittan/portfolio.ts ← constants/trivia.ts, fixtures/stories/*
            ├─ KittanModelClient.generate lib/kittan/gemini.ts (Interactions API)
            ├─ screenText           lib/kittan/guardrails.ts  (出力・ルールベース)
            └─ moderateOutput       lib/kittan/guardrails.ts  (出力・LLM判定)
```

| ファイル        | 役割                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `types.ts`      | 共通の型定義。`ChatResult` は `ok` / `blocked` / `error` の判別可能なユニオン。                |
| `config.ts`     | 環境変数の読み取り。**呼び出し時**に評価するので、鍵が無くてもビルドは通ります。               |
| `corpus.ts`     | `data/kittan/corpus.json` を静的インポートして検証。                                           |
| `portfolio.ts`  | サイトが表示しているデータからプロンプト用の事実情報を組み立てる純粋モジュール。               |
| `persona.ts`    | システムプロンプトと出力チェック用プロンプトの組み立て(純粋関数)。                             |
| `guardrails.ts` | リクエスト検証、ブロックリスト、LLMによる出力チェック。                                        |
| `gemini.ts`     | `@google/genai` の薄いラッパー。`KittanModelClient` インターフェースでテストから差し替え可能。 |
| `chat.ts`       | 上記を順に通す司令塔。プロバイダーの例外を外に投げません。                                     |
| `rateLimit.ts`  | インメモリのスライディングウィンドウ。                                                         |

すべてのモジュールはリクエスト時に Node 固有API(`fs` など)を使いません。データはすべて静的インポートなので、
Edge / Workers ランタイムへそのまま移せます。

## 環境変数

| 変数                                  | 必須 | 既定値             | 説明                                                                                                       |
| ------------------------------------- | ---- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`                      | ✅   | —                  | サーバー専用。`NEXT_PUBLIC_` を付けないこと(付けるとクライアントに漏れます)。                              |
| `KITTAN_MODEL`                        |      | `gemini-3.7-flash` | 生成モデル。                                                                                               |
| `KITTAN_MODERATION`                   |      | 有効               | `0` / `false` / `off` / `no` のときだけLLMによる出力チェックを無効化。**本番では無効にしないでください。** |
| `KITTAN_MAX_MESSAGE_LENGTH`           |      | `500`              | 1メッセージあたりの最大文字数。                                                                            |
| `KITTAN_MAX_HISTORY_TURNS`            |      | `20`               | 受け付ける最大メッセージ数(1ターン = user か assistant の1発言)。                                          |
| `KITTAN_MAX_OUTPUT_TOKENS`            |      | `640`              | 本文生成の最大出力トークン。                                                                               |
| `KITTAN_MAX_MODERATION_OUTPUT_TOKENS` |      | `32`               | 出力チェックの最大出力トークン。                                                                           |

ローカルでは `.env.local` に置いてください(`.gitignore` 済み)。

## API

### `POST /api/kittan-chat`

リクエスト:

```json
{
  "messages": [
    { "role": "user", "content": "やっほー" },
    { "role": "assistant", "content": "やっほー🐈" },
    { "role": "user", "content": "TrainLCDってなに？" }
  ]
}
```

- `messages` は `user` から始まり、`user` と `assistant` が交互に並び、`user` で終わる必要があります。
- 会話の状態はサーバーに保存しません。毎回クライアントが履歴を全部送ります。

レスポンス:

| ステータス | ボディ                                                                           | いつ                 |
| ---------- | -------------------------------------------------------------------------------- | -------------------- |
| `200`      | `{ "reply": "..." }`                                                             | 正常。               |
| `400`      | `{ "error": { "code": "invalid_json" \| "invalid_request", "message": "..." } }` | 形式不正。           |
| `400`      | `{ "error": { "code": "blocked_content", "message": "<定型のお断り文>" } }`      | 安全上ブロックした。 |
| `429`      | `{ "error": { "code": "rate_limited", "message": "..." } }` + `Retry-After`      | レート超過。         |
| `503`      | `{ "error": { "code": "service_unavailable", "message": "..." } }`               | 上流が混雑/停止。    |
| `500`      | `{ "error": { "code": "server_error", "message": "..." } }`                      | それ以外の失敗。     |

`blocked_content` の `message` は、きったんの口調を保った公開して問題のない定型文です。
UI側はこれをそのまま吹き出しとして表示して構いません(内部の判定理由は返しません)。

`POST` 以外のメソッドは、ハンドラーを export していないので Next.js が自動的に `405` を返します。
同一オリジンからの利用を前提にしているため、CORSヘッダーは付けていません。

## 安全設計

「暴言・公序良俗に反する内容を**絶対に**出さない」ことが最優先の要件です。単層では必ず穴が空くので、
層を重ねたうえで**迷ったら止める(fail-closed)**方針にしています。

1. **入力の検証** — 形・長さ・件数・roleの並びを確認。異常な履歴(system役の注入など)はここで落とします。
2. **入力のルールベース検査** — `BLOCKLIST` の正規表現に当たったら、モデルを呼ばずに定型文へ。
   履歴はすべてクライアント由来なので、`assistant` 側の発言も検査します。
3. **システムプロンプト** — `persona.ts` の「絶対に守る安全ルール」。挑発・なりすまし依頼・
   プロンプト開示要求への対応方針を明示しています。
4. **モデル側の既定フィルター** — Interactions API の既定の安全フィルター。
   なお、`CreateModelInteraction` の型には `safety_settings` がありますが、
   閾値を緩める設定は入れていません(既定のまま + 自前のガードレールで担保します)。
5. **出力のルールベース検査** — 生成された返答にもう一度 `BLOCKLIST` を当てます。
6. **出力のLLM検査** — 同じモデルに `thinking_level: 'low'`・ごく小さい出力上限で
   `{"verdict":"SAFE"}` / `{"verdict":"UNSAFE"}` だけを返させます。
   **JSONとして読めない・`SAFE` 以外・呼び出しが失敗、のいずれもブロック扱い**です。

ブロックされた経路はすべて同じ定型文 `KITTAN_FALLBACK_REPLY` を返します。
どこで止まったかをユーザーに教えないことで、ブロックリストの内容を推測されにくくしています。

### ブロックリストの方針

`BLOCKLIST` は「安く確実に弾ける明確な語」だけを対象にした一次フィルターです。網羅は狙っていません。

- 普通の日本語を巻き込まないよう、否定の接続(「死ねない」など)は除外し、単独では意味が定まらない語は
  複合語の形でのみ拾っています。
- 悩みの吐露(「つらい」「消えたい」)は**ブロックしません**。具体的な手段を求める表現だけを弾き、
  それ以外はモデルに渡してシステムプロンプトのルール(寄り添って相談窓口を案内する)で受け止めます。
- 各ルールは自己検証用の `probe` を持っており、テストはこれを使ってブロックリストを網羅確認します
  (テストコード側に該当語を書かなくて済むようにするための仕組みです)。

語を追加するときは、必ず「普通の会話を巻き込まないか」のテストも `guardrails.test.ts` に足してください。

## コーパスの更新方法(重要)

`data/kittan/corpus.json` が口調の学習元です。X(旧Twitter)の API は呼べないので、**手作業で更新する前提**の
ファイルになっています。同梱しているのは種となるサンプルなので、
**@tinykitten8 の実際のポストに置き換え・追記してください。**

```json
{
  "styleNotes": ["話し方の特徴のメモ"],
  "sampleUtterances": ["実際のポスト本文"],
  "everydayConversation": [{ "user": "質問", "kittan": "返答" }]
}
```

更新の手順:

1. https://x.com/tinykitten8 から、口調がよく出ているポストを選ぶ。
2. URL・メンション・ハッシュタグ・引用元など、会話の口調と関係ない要素は削る。
3. 他人の個人情報や、非公開にしたい情報が入っていないか確認する(**プロンプトに入る = 出力されうる**)。
4. `sampleUtterances` に追記する。口調の傾向が変わったら `styleNotes` も直す。
5. `vp test` を実行する。`persona.test.ts` がコーパスの形とプロンプトへの埋め込みを検証します。

`sampleUtterances` は10〜30件くらいが目安です。増やしすぎるとプロンプトが長くなり、
毎回のトークン消費が増えます(履歴は毎回全部送るステートレス方式のため)。

ポートフォリオ側の事実(豆知識・職歴・TrainLCDのあゆみ)は `portfolio.ts` が
`constants/trivia.ts` と `fixtures/stories/*.json` から自動で取り込みます。
豆知識は About 画面と `constants/trivia.ts` を共有しているので、片方だけ直れば両方に反映されます。

## デプロイの評価

### 現状: Vercel

- Next.js のルートハンドラー(`runtime = 'nodejs'`)としてそのまま動きます。
- `GEMINI_API_KEY` は Vercel のプロジェクト設定に**サーバー専用の環境変数**として登録します。
- 注意点: レートリミッターはインスタンスごとのメモリなので、実効上限は
  「10 req/分 × 同時に立っているインスタンス数」になります。ベストエフォートと割り切るか、
  Upstash Redis などの共有ストアに差し替えてください(`RateLimiter` 型はそのまま使えます)。
- 生成に数秒かかるため、関数の最大実行時間には余裕を持たせてください。

### Cloudflare へ移す場合(`@opennextjs/cloudflare`)

このディレクトリのコードは Node 固有APIを使っていないので、移行コストは小さいはずです。

1. `@opennextjs/cloudflare` を入れ、`wrangler.toml` と `open-next.config.ts` を用意する。
2. `GEMINI_API_KEY` を `wrangler secret` として登録する(`process.env` 経由で読めます)。
3. `app/api/kittan-chat/route.ts` の `runtime` を `'edge'` に変えるか、
   `@opennextjs/cloudflare` の Node 互換モード(`nodejs_compat`)のまま動かす。
4. `@google/genai` は `fetch` ベースなので Workers 上でも動きますが、
   ビルド後のバンドルサイズと Workers の CPU 時間上限を必ず実測してください。
5. レートリミットは Durable Objects か Workers KV に置き換えると、インスタンス跨ぎで正しく効きます。

移行時に手を入れる必要があるのは、実質 `route.ts` のランタイム指定とレートリミットの実装だけです。

## ストリーミングについて(将来の課題)

**v1は意図的に非ストリーミングです。** 「絶対に暴言・公序良俗に反する内容を出さない」を満たすには、
返答全体が出力チェックを通り終えるまで、1文字もクライアントに渡してはいけないからです。
途中まで流してから「やっぱりダメでした」と取り消しても、ユーザーの画面には既に表示されてしまいます。

将来ストリーミングを入れるなら、次のどれかになります。

- **段落バッファリング**: 文や段落の区切りごとにバッファし、その塊が検査を通ってから流す。
  体感は改善しますが、レイテンシーとチェック回数(= コスト)のトレードオフになります。
- **楽観的ストリーミング + 取り消し**: 流しながら検査し、UNSAFEなら表示を差し替える。
  一瞬でも表示されるので、今回の要件には合いません。
- **入力の事前チェックだけ強化して本文はストリーミング**: 出力の最終保証が弱くなるので非推奨です。

SDK側は `interactions.create({ ..., stream: true })` でイベントを返せます
(`event.event_type === 'step.delta'` / `event.delta.type === 'text'`)。
`gemini.ts` の `KittanModelClient` に `generateStream` を足せば、上位の構造は変えずに拡張できます。

## テスト

```sh
vp test          # ウォッチ
vp test --run    # 1回だけ
```

ネットワークには一切アクセスしません。`KittanModelClient` をモックに差し替えてテストしています。

| テスト                                        | 対象                                                     |
| --------------------------------------------- | -------------------------------------------------------- |
| `guardrails.test.ts`                          | 検証・ブロックリスト・出力チェックのfail-closed          |
| `chat.test.ts`                                | 司令塔の分岐(正常系・入力ブロック・出力ブロック・エラー) |
| `rateLimit.test.ts`                           | 時計を注入したウィンドウの挙動                           |
| `persona.test.ts`                             | コーパス検証・ポートフォリオ取り込み・プロンプトの内容   |
| `config.test.ts`                              | 環境変数の読み取り                                       |
| `gemini.test.ts`                              | steps変換・エラーの理由コード対応づけ                    |
| `app/api/kittan-chat/__tests__/route.test.ts` | ルートハンドラー(200 / 400 / 429 / 503 / 500)            |

## 未実装 / 今後

- UI(チャット画面)。
- ストリーミング(上記の理由で v1 では見送り)。
- 共有ストアによるレートリミット。
- 会話ログの保存(現在は一切保存していません。`store: false` でモデル側にも残しません)。
