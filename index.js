require('dotenv').config()
const Discord = require("discord.js")
const fetch = require("node-fetch")
const package = require("./package.json")
const config = package.config

const help = require('./src/commands/help')
const serverInfo = require('./src/commands/serverInfo')
const playerInfo = require('./src/commands/playerInfo')

const bot = new Discord.Client()

bot.on("ready", () => {
	console.log(`${bot.user.username} v${package.version} is ready!`)
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
		help(msg)
	}

	else if (command === 'serverinfo' || command == 'si') {
		serverInfo(msg, bot.user.avatarURL)
	}

	else if (command === 'players' || command == 'p') {
		playerInfo(msg, bot.user.avatarURL)		
	}
})

// https://discordapp.com/oauth2/authorize?client_id=248564950136651776&scope=bot
bot.login(process.env.DISCORD_ACCESS_TOKEN);