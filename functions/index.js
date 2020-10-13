const functions = require('firebase-functions')
const rp = require('request-promise')
var bbt = require('beebotte')

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

function postToBeebotte(count) {
  const { api_key, secret_key } = functions.config().beebotte
  var bclient = new bbt.Connector({
    apiKey: api_key,
    secretKey: secret_key
  })
  bclient.write(
    {
      channel: 'praise',
      resource: 'count',
      data: count
    },
    (err, res) => {
      if (err) {
        console.error(err)
      }
    }
  )
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
    postToBeebotte(newValue.count)
  })
