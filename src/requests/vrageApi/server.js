const fetch = require('node-fetch')
// const generateAuthorization = require('./authorization')
// const moment = require('moment')

// Session Controller


// Claims

const getServer = () => {

    return fetch(`http://${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/server`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
       return(json.Data)
    });
}

module.exports = [getServer];