const gamedig = require('../utils/gamedig')
const topHatEngineersConfig = require('../requests/gamedig/topHatEngineers')

const serverInfo = (msg, botAvatar) => {
    msg.react("🎩")

    gamedig(
        topHatEngineersConfig,
        state => {
            const mods = []

            for (let mod in state.raw.rules) {

                if (mod !== 'mods') {
                    mods.push(state.raw.rules[mod])
                }
            }

            msg.channel.send({
                embed: {
                    author: {
                        name: 'Server info',
                        icon_url: botAvatar
                    },
                    color: 3447003,
                    fields: [{
                        name: 'Name',
                        value: `${state.name}`
                    },{
                        name: 'Players',
                        value: `${state.raw.numplayers}/${state.maxplayers}`
                    },{
                        name: 'Version',
                        value: `${state.raw.version}`
                    },{
                        name: `Mods (${mods.length})`,
                        value: `${(mods.length > 1 ? `${mods.join(', ')}` : 'None')}`
                    }],
                    timestamp: new Date()
                }
            })
        },
        error => {
            console.error('error', error)
            msg.channel.send(`**Server is offline**`).then(reply => {
                reply.react("😭")
            })
        }
    )
}

module.exports = serverInfo