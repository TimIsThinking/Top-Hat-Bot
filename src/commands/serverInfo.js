const gamedig = require('../utils/gamedig')
const topHatEngineersConfig = require('../requests/gamedig/topHatEngineers')
const {getServer} = require('../requests/vrageApi/server')
const {getServerByName} = require('../../api/controllers/server')

const serverInfo = async (msg, args) => {
    msg.react("🎩")
    msg.channel.startTyping();

    // getServer().then(data => {
    //     const simSpeed = data.SimSpeed
    //     const upTime = `${Math.floor(data.TotalTime / 3600)}h ${Math.floor(data.TotalTime / 60 % 60)}m ${data.TotalTime % 60}s`

    //     console.log(data)
    // })

    const server = await getServerByName(args.join(' '))
    if (server) {
        gamedig({
                type: server.game.toLowerCase().replace(/\s/g, ""),
                host: server.address,
                port: server.port
            },
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
    } else {
        msg.channel.send('I could not find a server with that name!');
    } 

    msg.channel.stopTyping();
}

module.exports = serverInfo;
