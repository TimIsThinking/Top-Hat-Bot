let acceptedReactions = ['👍', '👎']

class pollTable {
    constructor(options) {
        this.title = options.title || 'Title'
        this.total = 0
        this.positiveVotes = 0
        this.negativeVotes = 0
    }

    addPositiveVote() {
        this.positiveVotes ++
        this.total ++
    }

    removePositiveVote() {
        this.positiveVotes --
        this.total --
    }

    addNegativeVote() {
        this.negativeVotes ++
        this.total ++
    }

    removeNegativeVote() {
        this.negativeVotes --
        this.total --
    }

    get render() {
        const percentage = this.total > 0 ? Math.round((this.positiveVotes / this.total) * 100) : 50
        const table = `[${Array(Math.round(percentage/5)).join('|')}${Array(Math.round(20 - (percentage / 5))).join(' ')}] ${percentage}%`
        return (
            this.title
            + (
                this.total > 0 ? (
                    '```'
                    + table
                    + '```'
                ) : ''
            )
        )
    }
}

let timerId

const poll = async (bot, msg, args) => {
    msg.react('🎩')

    const table = new pollTable({
        title: args.join(' ') || 'TITLE'
    })

    msg.channel.send(table.render)
    .then(pollMsg => {

        acceptedReactions.map(r => pollMsg.react(r))

        const messageReactionAdd = bot.on('messageReactionAdd', (msgReaction, user) => {
            if (user.bot) return
            if (msgReaction.message.id !== pollMsg.id) return
            if (acceptedReactions.includes(msgReaction._emoji.name)) {
                msgReaction._emoji.name === '👍' && table.addPositiveVote()
                msgReaction._emoji.name === '👎' && table.addNegativeVote()

                msgReaction._emoji.name === '👍'
                && pollMsg.reactions.filter(r => {
                    r._emoji.name === '👎' && r.users.find(u => u.id === user.id) && r.remove(user)
                })

                msgReaction._emoji.name === '👎'
                && pollMsg.reactions.filter(r => {
                    r._emoji.name === '👍' && r.users.find(u => u.id === user.id) && r.remove(user)
                })
            }
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => pollMsg.edit(table.render), 1000)
        })

        const messageReactionRemove = bot.on('messageReactionRemove', (msgReaction, user) => {
            if (user.bot) return
            if (msgReaction.message.id !== pollMsg.id) return
            if (acceptedReactions.includes(msgReaction._emoji.name)) {
                msgReaction._emoji.name === '👍' && table.removePositiveVote()
                msgReaction._emoji.name === '👎' && table.removeNegativeVote()
            }
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => pollMsg.edit(table.render), 1000)
        })
    })
}

module.exports = poll