const commands = [
    '!changelog - Get changelog link',
    '!github - Get github link',
    '!help - This help menu',
    '!hi - Hello!',
    '!players - Get players info',
    '!serverinfo - Display information about the server',
    '!suggest <SUGGESTION> - Send a suggestion for me to improve!',
    '!version - Get bot version'
]

const help = msg => {
    msg.author.send(
        `
        **Commands**\n\n${commands.join('\n')}
        `
    )
    
    msg.reply(`check your DMs`)
}

module.exports = help