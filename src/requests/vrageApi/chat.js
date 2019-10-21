const fetch = require('node-fetch')
const generateAuthorization = require('./authorization')
const moment = require('moment')

// Chat Controller

const getChat = async () => {

    return fetch(`http://${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/session/gamechat/world`, {
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

const getAllChat = async () => {

    const date = `${moment.utc().format('ddd, DD MMM YYYY HH:mm:ss')} GMT`
    const authCode = generateAuthorization('/vrageremote/v1/session/gamechat', date, process.env.MEDIEVAL_API_KEY)

    return fetch(`http://${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/session/gamechat`, {
        method: 'GET',
        headers: {
            'Date': date,
            'Accept': 'application/json',
            'Authorization': authCode
        }
    })
    .then(res => res.json())
    .then(json => {
       return(json.Data)
    });
}

const sendChat = async chat => {

    const date = `${moment.utc().format('ddd, DD MMM YYYY HH:mm:ss')} GMT`
    const authCode = generateAuthorization('/vrageremote/v1/session/gamechat', date, process.env.MEDIEVAL_API_KEY)

    const data = JSON.stringify({
        'RecipientIdentityId': null,
        'Message': chat
    })

    fetch(`http://${process.env.MEDIEVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/session/gamechat`, {
        method: 'POST',
        body: data,
        headers: {
            'Date': date,
            'Accept': 'application/json',
            'Authorization': authCode,
            'Content-Type': 'application/json'
        }
    })


}

module.exports = { getChat, getAllChat, sendChat };