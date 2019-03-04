const Server = require('../models/server');

createServer = (name, game, address, port, apiAddress, apiPort, apiKey) => {

    const new_server = new Server({
        name: name,
        game: game,
        address: address,
        port: port,
        apiAddress: apiAddress,
        apiPort: apiPort,
        apiKey: apiKey
    })

    new_server.save(err => {
        if (err) return {
          message: "Failed to save server."
        };

        return new_server;
    })
}

getServer = id => {
    Server.findOne({ _id: id }, (err, server) => {
        if (err) return {
          message: "No server exists with this ID."
        };

        return server;
    })
}

getServerByName = name => {
    return Server.findOne({ name: name }, (err, server) => {
        if (err) return {
          message: "Error finding server"
        };

        return server;
    })
}

getServers = () => {
    const serverData = Server.find({}, (err, servers) => {
        if (err) return {
          message: "No server exists with this ID."
        };

        return servers;
    })

    return serverData
}

module.exports = {
    createServer,
    getServer,
    getServerByName,
    getServers
}