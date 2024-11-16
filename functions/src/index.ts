import * as functions from "firebase-functions";
import fetch from "node-fetch";
// なぜかbeebotteはimportで使えない
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bbt = require("beebotte");

/**
 *
 * @param {string} text Slackに送り付けたい文言
 * @return {Promise<Response>}
 */
function postToSlack(text: string) {
  return fetch(functions.config().slack.webhook_url, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
  });
}

/**
 *
 * @param {number} count ほめられた回数
 * @return {void}
 */
function postToBeebotte(count: number) {
  // eslint-disable-next-line camelcase
  const {api_key, secret_key} = functions.config().beebotte;
  const bclient = new bbt.Connector({
    // eslint-disable-next-line camelcase
    apiKey: api_key,
    // eslint-disable-next-line camelcase
    secretKey: secret_key,
  });
  bclient.write(
    {
      channel: "praise",
      resource: "count",
      data: count,
    },
    (err: Error) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

/**
 *
 * @param {number} count ほめられた回数
 * @return {void}
 */
async function notifyToKDS(count: number) {
  await fetch(functions.config().kds.webhook_url, {
    method: "POST",
    body: JSON.stringify({
      type: "notify",
      title: "TinyKitten.meのほめるが増えました",
      description: `ほめられた回数: ${count}`,
      channel: "",
      urgent: false,
    }),
  });
}

exports.praiseUpdateHook = functions.database
  .ref("/praise/count")
  .onUpdate((change) => {
    const newValue = change.after.val();
    const msg = `
    TinyKitten.meのほめるが増えました:clap:
  新しいほめる数: ${newValue}
    `.trim();
    postToSlack(msg);
    postToBeebotte(newValue);
    notifyToKDS(newValue);
  });
