const {createServer, getServer, getServers} = require('../../api/controllers/server')

const addServer = async (msg, args) => {

    const data = createServer("Top Hat Naval", "Medieval Engineers", "me.tophatservers.com", "27019", "me.tophatservers.com", "8081", "2aqWMdCd5+EMtZBUnsxtNQ==")
}

const listServers = async msg => {

    getServers().then(servers => {
        const fields = []

        servers.map(server => {
            fields.push({
                name: server.name,
                value: `${server.address}:${server.port}`
            })
        })

        msg.channel.send({
            embed: {
                title: "📡 Server List 📡",
                color: 3447003,
                fields: fields,
                timestamp: new Date()
            }
        })
    })
}

module.exports = [
    addServer,
    listServers
]