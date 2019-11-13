const functions = require('firebase-functions')
const rp = require('request-promise')

function postToSlack(text) {
  return rp({
    method: 'POST',
    uri: functions.config().slack.webhook_url,
    body: {
      text
    },
    json: true
  })
}

exports.praiseUpdateHook = functions.firestore
  .document('/public/praise')
  .onUpdate(change => {
    const newValue = change.after.data()
    const msg = `
    TinyKitten.meのほめるが増えました:clap:
  新しいほめる数: ${newValue.count}
    `
    postToSlack(msg)
  })
