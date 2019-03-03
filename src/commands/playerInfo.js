const gamedig = require('../utils/gamedig')
const topHatEngineersConfig = require('../requests/gamedig/topHatEngineers')

const playerInfo = (msg) => {
    msg.react("🎩")

    gamedig(
        topHatEngineersConfig,
        state => {
            msg.channel.send({
                embed: {
                    author: {
                        name: `Players (${state.players.length})`,
                    },
                    color: 3447003,
                    fields: state.players.map(player => {

                        const time = player.time

                        const hours = ~~(time / 3600)
                        const mins = ~~((time % 3600) / 60)
                        const secs = Math.round(time % 60)

                        let timeString = `${time}`

                        timeString = hours > 0
                        ? (
                            mins > 0
                            ? `${hours}h ${mins}m ${secs}s`
                            : `${hours}h ${secs}s`
                        ) : (
                            mins > 0
                            ? `${mins}m ${secs}s`
                            : `${secs}s`
                        )

                        return {
                            name: `${player.name}`,
                            value: `Online for: ${timeString}`
                        }
                    }),
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

module.exports = playerInfo