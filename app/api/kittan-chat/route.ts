import { chatWithKittan } from '../../../lib/kittan/chat';
import { createRateLimiter } from '../../../lib/kittan/rateLimit';
import type { ChatResult } from '../../../lib/kittan/types';

export const runtime = 'nodejs';
// 会話ごとに結果が変わるので常に動的実行。
export const dynamic = 'force-dynamic';

/** 同一IPあたり 10 リクエスト / 分(インスタンス単位のベストエフォート)。 */
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

const rateLimiter = createRateLimiter({
  limit: RATE_LIMIT,
  windowMs: RATE_LIMIT_WINDOW_MS,
});

type ErrorCode =
  | 'invalid_json'
  | 'invalid_request'
  | 'blocked_content'
  | 'rate_limited'
  | 'server_error'
  | 'service_unavailable';

const jsonResponse = (body: unknown, status: number, extraHeaders?: Record<string, string>) => {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
  });
  for (const [name, value] of Object.entries(extraHeaders ?? {})) {
    headers.set(name, value);
  }
  return new Response(JSON.stringify(body), { status, headers });
};

const errorResponse = (
  code: ErrorCode,
  message: string,
  status: number,
  extraHeaders?: Record<string, string>,
) => jsonResponse({ error: { code, message } }, status, extraHeaders);

/** x-forwarded-for の先頭がクライアントIP。取れないときは共有バケットに落とします。 */
export const resolveClientKey = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  if (first !== undefined && first.length > 0) {
    return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  return realIp !== undefined && realIp.length > 0 ? realIp : 'unknown';
};

/**
 * 停止・失敗の理由をサーバーログにだけ残します。
 * クライアントには従来どおり定型文しか返さない(どの層で止まったかを外から観測させない)ため、
 * 原因の切り分けはこのログ(Vercel の Function logs)からのみ行えます。
 * プライバシー方針として、会話の内容・ユーザー入力は一切ログしません。
 */
const logRejection = (result: Exclude<ChatResult, { status: 'ok' }>): void => {
  const validationCode = result.status === 'blocked' ? result.validationCode : undefined;
  console.warn(
    `[kittan-chat] ${result.status}: reason=${result.reason}` +
      (validationCode === undefined ? '' : ` validationCode=${validationCode}`),
  );
};

const toResponse = (result: ChatResult): Response => {
  if (result.status === 'ok') {
    return jsonResponse({ reply: result.reply }, 200);
  }

  logRejection(result);

  if (result.status === 'blocked') {
    if (result.reason === 'invalid_request') {
      return errorResponse(
        'invalid_request',
        'メッセージの形式が正しくありません。もう一度試してみてね。',
        400,
      );
    }
    // 内部の判定理由は出さず、ペルソナを保った定型文だけを返します。
    return errorResponse('blocked_content', result.reply, 400);
  }

  if (result.reason === 'rate_limited_upstream' || result.reason === 'unavailable') {
    return errorResponse(
      'service_unavailable',
      'いま少し混み合っているみたい。しばらくしてからもう一度試してね🙏',
      503,
    );
  }

  return errorResponse(
    'server_error',
    'うまくお返事できませんでした。しばらくしてからもう一度試してね🙏',
    500,
  );
};

export const POST = async (request: Request): Promise<Response> => {
  const limit = rateLimiter.check(resolveClientKey(request));
  if (!limit.allowed) {
    return errorResponse(
      'rate_limited',
      'ちょっとおしゃべりのペースが速すぎるかも！少し待ってからまた話しかけてね🙏',
      429,
      { 'retry-after': String(Math.ceil(limit.retryAfterMs / 1000)) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('invalid_json', 'リクエストの形式が正しくありません。', 400);
  }

  const result = await chatWithKittan(body);
  return toResponse(result);
};
