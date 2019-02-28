const fetch = require('node-fetch')
const moment = require('moment')
const [getFactions, getFaction] = require('../requests/vrageApi/faction')

const factions = (msg, args) => {
    msg.react('🎩')

    if (args.length > 0) {
        getFaction(args[0]).then(faction => {
            const factionFormatted = `[${faction.Tag}] **${faction.Name}** Leader: ${faction.LeaderName}\r\n${faction.PublicInformation}`
    
            msg.channel.send(factionFormatted)
        })
    } else {
        getFactions().then(data => {
            const factionsFormatted = data.map(faction => {
                return `[${faction.Tag}] ${faction.Name}`
            }).join('\r\n')

            msg.channel.send(factionsFormatted)
        })
    }
}

module.exports = factions