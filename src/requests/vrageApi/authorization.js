const crypto = require('crypto')

const generateNonce = (length) => {
    let text = ""
    const possible = "0123456789"
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const generateAuthorization = (route, date, apiKey) => {
    
    const nonce = generateNonce(9)
    const message = (`${route}\r\n${nonce}\r\n${date}\r\n`)
    const key = Buffer.from(apiKey, 'base64')
    const hash = crypto.createHmac('sha1', key).update(message).digest('base64')
    const authorization = `${nonce}:${hash}`

    return authorization
}

module.exports = generateAuthorization