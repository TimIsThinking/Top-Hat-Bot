const fetch = require('node-fetch')
const moment = require('moment')
const [getChat, sendChat] = require('../requests/vrageApi/chat')

const chat = (msg, args) => {
    msg.react('🎩')

    if (args.length > 0) {
        sendChat(args.join(' '))
    } else {
        getChat().then(data => {
            messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)
            messageArray = messages.map(message => {
                return `**${message.DisplayName}**: ${message.Content}`
            })
            msg.channel.send(messageArray.join('\r\n'))
        })
    }   
}

module.exports = chat