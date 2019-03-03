const fetch = require('node-fetch')
const moment = require('moment')
const [getChat, getAllChat, sendChat] = require('../requests/vrageApi/chat')

const chat = (msg, args) => {
    msg.react('🎩')

    if (args.length > 0) {

        if (args[0] === 'all') {
            getAllChat().then(data => {
                messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)
                messageArray = messages.map(message => {
                    return `**${message.DisplayName}**: ${message.Content}`
                })
                msg.channel.send(messageArray.join('\r\n'))
            })
        } else {
            sendChat(args.join(' '))
        }

    } else {
        getChat().then(data => {
            messages = data.Messages.slice(data.Messages.length - 10, data.Messages.length)

            if (messages.length > 0) {
                messageArray = messages.map(message => {
                    return `**${message.DisplayName}**: ${message.Content}`
                })
                msg.channel.send(messageArray.join('\r\n'))
            } else {
                msg.channel.send('No messages found')
            }
        })
    }   
}

module.exports = chat