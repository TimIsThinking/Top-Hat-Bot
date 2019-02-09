const fetch = require('node-fetch')
const crypto = require('crypto')
const moment = require('moment');

const chat = (msg, botAvatar) => {
    msg.react('🎩')

    let nonce = function(length) {
        var text = "";
        var possible = "0123456789";
        for(let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    const today = moment();
    const date = `${today.format('ddd, DD MMM YYYY HH:mm:ss')} GMT`
    const myNonce = nonce(9)
    const message = (`/vrageremote/v1/session/gamechat\r\n${myNonce}\r\n${date}\r\n`)
    const key = Buffer.from(process.env.MEDIEVAL_API_KEY, 'base64')
    const hash = crypto.createHmac('sha1', key).update(message).digest('base64')

    const data = JSON.stringify({
        'RecipientIdentityId': null,
        'Message': 'api test, hello?'
    })

    fetch(`http://${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/session/gamechat`, {
        method: 'POST',
        body: data,
        headers: {
            'Date': date,
            'Authorization': `${myNonce}:${hash}`,
            'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log(res))
}

module.exports = chat