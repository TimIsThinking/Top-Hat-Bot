const gamedig = require('./gamedig')
const topHatEngineersConfig = require('../requests/gamedig/topHatEngineers')

const activityChecker = bot => {

    gamedig(
        topHatEngineersConfig,
        state => {
            state.maxplayers > 0 ? (
                bot.user.setActivity(`Top Hat Engineers ${state.raw.numplayers}/${state.maxplayers}`, {type: 'PLAYING'} )
            ) : (
                bot.user.setActivity(`Loading...`, {type: 'PLAYING'} )
            )
    }, error => {
        bot.user.setActivity('Server Offline', {type: 'WATCHING'})
    })

    setTimeout(() => activityChecker(bot), 60000)
}

module.exports = activityChecker

