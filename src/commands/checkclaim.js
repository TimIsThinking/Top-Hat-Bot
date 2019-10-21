const fetch = require('node-fetch')
const moment = require('moment')
const [getClaims, getPlayerClaims] = require('../requests/vrageApi/claims')

const checkClaims = async (bot, msg, args) => {
    msg.react('🎩')

    // getPlayerClaims().then(data => {
    //     messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)

    //     if (messages.length > 0) {
    //         messageArray = messages.map(message => {
    //             return `**${message.DisplayName}**: ${message.Content}`
    //         })
    //         msg.channel.send(messageArray.join('\r\n'))
    //     } else {
    //         msg.channel.send('No messages found')
    //     }
    // })
}

module.exports = checkClaims