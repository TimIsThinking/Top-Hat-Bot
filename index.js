const Discord = require("discord.js")
const fetch = require("node-fetch")
const Gamedig = require('gamedig')
const config = require("./package.json").config

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
	
	else if (command === 'say') {
		msg.channel.send(args.join(" "))
	}
	
	else if (command === 'help') {
		msg.author.send(
			`
			\n**Commands**
			\n!help - This help menu
			\n!serverinfo - Display information about the server
			\n!hi - Hello!
			\n!say - Make me say things
			`
		)
		msg.reply(`check your DMs`)
	}

	else if (command === 'serverinfo' || command == 'si') {

		msg.react("🎩")

		Gamedig.query({
			type: 'medievalengineers',
			host: '188.165.229.91',
			port: '27017'
		}).then((state) => {
			// console.log(state);

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

		}).catch((error) => {
			console.error('error', error)
			msg.channel.send(`**Server is offline**`).then(reply => {
				reply.react("😭")
			})
		});
	}
})

// https://discordapp.com/oauth2/authorize?client_id=248564950136651776&scope=bot
bot.login(config.token);