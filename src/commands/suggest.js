const suggest = async (msg, args) => {
    if (args < 1) {
        msg.reply(`Suggestion cannot be empty, usage: !suggest <SUGGESTION>`)
        return
    } else {
        // This is pretty terrible but will work for now ...
        const owner = msg.channel.guild.members.find(member => member.id === msg.channel.guild.ownerID)
        owner.user.send(`Suggestion from ${msg.author.username}: ${args.join(' ')}`)
        msg.reply(`Thanks for your suggestion ${msg.author.username}!`)
    }
}

module.exports = suggest