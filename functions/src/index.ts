import { logger } from "firebase-functions";
import { onValueUpdated } from "firebase-functions/database";
import { defineSecret } from "firebase-functions/params";
// beebotteはESM importに対応していないためrequireで読み込む
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bbt = require("beebotte");

const slackWebhookUrl = defineSecret("SLACK_WEBHOOK_URL");
const beebotteApiKey = defineSecret("BEEBOTTE_API_KEY");
const beebotteSecretKey = defineSecret("BEEBOTTE_SECRET_KEY");

/**
 *
 * @param {string} webhookUrl Slack Incoming WebhookのURL
 * @param {string} text Slackに送り付けたい文言
 * @return {Promise<void>}
 */
async function postToSlack(webhookUrl: string, text: string): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  if (!res.ok) {
    throw new Error(`Slack webhook failed: ${res.status} ${res.statusText}`);
  }
}

/**
 *
 * @param {string} apiKey beebotteのAPIキー
 * @param {string} secretKey beebotteのシークレットキー
 * @param {number} count ほめられた回数
 * @return {Promise<void>}
 */
function postToBeebotte(apiKey: string, secretKey: string, count: number): Promise<void> {
  const bclient = new bbt.Connector({
    apiKey,
    secretKey,
  });
  return new Promise((resolve, reject) => {
    bclient.write(
      {
        channel: "praise",
        resource: "count",
        data: count,
      },
      (err: Error | null) => {
        if (err) {
          logger.error(err);
          reject(err);
          return;
        }
        resolve();
      },
    );
  });
}

export const praiseUpdateHook = onValueUpdated(
  {
    ref: "/praise/count",
    secrets: [slackWebhookUrl, beebotteApiKey, beebotteSecretKey],
  },
  async (event) => {
    const beforeValue = event.data.before.val();
    const afterValue = event.data.after.val();
    if (typeof afterValue !== "number") {
      logger.warn("ほめる数が数値ではないため通知をスキップします", {
        afterValue,
      });
      return;
    }
    const previousValue = typeof beforeValue === "number" ? beforeValue : 0;
    if (afterValue <= previousValue) {
      return;
    }
    const msg = `
    TinyKitten.meのほめるが増えました:clap:
  新しいほめる数: ${afterValue}
    `.trim();
    await postToSlack(slackWebhookUrl.value(), msg);
    await postToBeebotte(beebotteApiKey.value(), beebotteSecretKey.value(), afterValue);
  },
);
