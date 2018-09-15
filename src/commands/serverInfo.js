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

            const fields = []

            fields.push({
                name: 'Name',
                value: `${state.name}`
            })

            fields.push(
                state.maxplayers > 0 ? ({
                    name: 'Players',
                    value: `${state.raw.numplayers}/${state.maxplayers}`
                }) : ({
                    name: 'Status',
                    value: 'Server is loading, check again soon ...'
                })
            )

            fields.push({
                name: 'Version',
                value: `${state.raw.version}`
            })

            fields.push({
                name: `Mods (${mods.length})`,
                value: `${(mods.length > 1 ? `${mods.join(', ')}` : 'None')}`
            })

            state.maxplayers > 0 && (
                fields.push({
                    name: `Connect`,
                    value: `steam://connect/${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_DS_PORT}`
                })
            )

            msg.channel.send({
                embed: {
                    title: "📡 Server Info 📡",
                    color: 3447003,
                    fields: fields,
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
