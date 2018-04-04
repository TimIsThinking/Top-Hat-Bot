require('dotenv').config()
const Discord = require("discord.js")
const fetch = require("node-fetch")
const Gamedig = require('gamedig')
const package = require("./package.json")
const config = package.config

const gamedig = (callback, callbackError) => {

	Gamedig.query({
		type: 'medievalengineers',
		host: process.env.MEDIEVAL_DS_ADDRESS,
		port: '27017'
	}).then((state) => {
		callback(state)
	}).catch((error) => {
		console.error('error', error)
		callbackError(error)
	});
}

const bot = new Discord.Client()

bot.on("ready", () => {
	console.log(`${bot.user.tag} is ready!`)
})

bot.on("message", msg => {
	if (msg.author.bot) return
	if (!msg.content.startsWith(config.prefix)) return
	
	let command = msg.content.split(" ")[0]
	command = command.slice(config.prefix.length)
	command = command.toLowerCase()
	
	let args = msg.content.split(" ").slice(1)
	
	if (command === 'hi') {
		msg.reply('hai there!')
	}
	
	else if (command === 'version' || command === 'v') {
		msg.channel.send(`Version: ${package.version}`)
	}
	
	else if (command === 'help' || command === 'h') {

		const commands = [
			'!help - This help menu',
			'!hi - Hello!',
			'!players - Get players info',
			'!serverinfo - Display information about the server',
			'!version - Get bot version'
		]

		msg.author.send(
			`
			**Commands**\n\n${commands.join('\n')}
			`
		)
		
		msg.reply(`check your DMs`)
	}

	else if (command === 'serverinfo' || command == 'si') {

		msg.react("🎩")

		gamedig(state => {
			const mods = []

			for (let mod in state.raw.rules) {

				if (mod !== 'mods') {
					mods.push(state.raw.rules[mod])
				}
			}

			msg.channel.send({
				embed: {
					author: {
						name: 'Server info',
						icon_url: bot.user.avatarURL
					},
					color: 3447003,
					fields: [{
						name: 'Name',
						value: `${state.name}`
					},{
						name: 'Players',
						value: `${state.raw.numplayers}/${state.maxplayers}`
					},{
						name: 'Version',
						value: `${state.raw.version}`
					},{
						name: `Mods (${mods.length})`,
						value: `${(mods.length > 1 ? `${mods.join(', ')}` : 'None')}`
					}],
					timestamp: new Date()
				}
			})
		}, error => {
			console.error('error', error)
			msg.channel.send(`**Server is offline**`).then(reply => {
				reply.react("😭")
			})
		})
	}

	else if (command === 'players' || command == 'p') {

		msg.react("🎩")

		gamedig(state => {
			msg.channel.send({
				embed: {
					author: {
						name: `Players (${state.players.length})`,
						icon_url: bot.user.avatarURL
					},
					color: 3447003,
					fields: state.players.map(player => {

						const time = player.time

						const hours = ~~(time / 3600)
						const mins = ~~((time % 3600) / 60)
						const secs = Math.round(time % 60)

						let timeString = `${time}`

						timeString = hours > 0
						? (
							mins > 0
							? `${hours}h ${mins}m ${secs}s`
							: `${hours}h ${secs}s`
						) : (
							mins > 0
							? `${mins}m ${secs}s`
							: `${secs}s`
						)

						return {
							name: `${player.name}`,
							value: `Online for: ${timeString}`
						}
					}),
					timestamp: new Date()
				}
			})
		}, error => {
			console.error('error', error)
			msg.channel.send(`**Server is offline**`).then(reply => {
				reply.react("😭")
			})
		})
	}
})

// https://discordapp.com/oauth2/authorize?client_id=248564950136651776&scope=bot
bot.login(process.env.DISCORD_ACCESS_TOKEN);