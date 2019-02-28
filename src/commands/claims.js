const fetch = require('node-fetch')
const moment = require('moment')
const [getClaims] = require('../requests/vrageApi/session')

const claims = (msg, args) => {
    msg.react('🎩')

    getClaims().then(data => {
        const claimsFormatted = data.map(claim => {
            return `${claim.AreaId}: ${claim.Name}`
        }).join('\r\n')

        msg.channel.send(claimsFormatted)
    })
}

module.exports = claims