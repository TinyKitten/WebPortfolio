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
  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
  });
}

/**
 *
 * @param {string} apiKey beebotteのAPIキー
 * @param {string} secretKey beebotteのシークレットキー
 * @param {number} count ほめられた回数
 * @return {void}
 */
function postToBeebotte(apiKey: string, secretKey: string, count: number): void {
  const bclient = new bbt.Connector({
    apiKey,
    secretKey,
  });
  bclient.write(
    {
      channel: "praise",
      resource: "count",
      data: count,
    },
    (err: Error) => {
      if (err) {
        logger.error(err);
      }
    },
  );
}

export const praiseUpdateHook = onValueUpdated(
  {
    ref: "/praise/count",
    secrets: [slackWebhookUrl, beebotteApiKey, beebotteSecretKey],
  },
  async (event) => {
    const newValue = event.data.after.val();
    const msg = `
    TinyKitten.meのほめるが増えました:clap:
  新しいほめる数: ${newValue}
    `.trim();
    await postToSlack(slackWebhookUrl.value(), msg);
    postToBeebotte(beebotteApiKey.value(), beebotteSecretKey.value(), newValue);
  },
);
