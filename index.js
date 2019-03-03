require('dotenv').config()
const Discord = require("discord.js")
const mongoose = require("mongoose")
const package = require("./package.json")
const config = package.config

const activityChecker = require('./src/utils/activityChecker')

const help = require('./src/commands/help')
const serverInfo = require('./src/commands/serverInfo')
const playerInfo = require('./src/commands/playerInfo')
const suggest = require('./src/commands/suggest')
const votes = require('./src/commands/votes')
const poll = require('./src/commands/poll')
const chat = require('./src/commands/chat')
const claims = require('./src/commands/claims')
const factions = require('./src/commands/factions')
// const checkClaims = require('./src/commands/checkclaim')

const checkIfAdmin = require('./src/middleware/authorization')
const [createServer, listServers] = require('./src/commands/servers')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB!')
});

const bot = new Discord.Client()

bot.on('ready', () => {
    console.log(`${bot.user.username} v${package.version} is ready!`)

    activityChecker(bot)
})

bot.on('message', msg => {
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
		serverInfo(msg)
	}

	else if (command === 'players' || command == 'p') {
		playerInfo(msg)
	}

	else if (command === 'github' || command === 'gh') {
		msg.channel.send(`Github: ${package.repository.url}`)
	}

	else if (command === 'changelog' || command === 'cl' || command === 'changes') {
		args.includes('latest')
		? msg.channel.send(`Latest changelog: ${package.repository.url}/releases/latest`)
		: msg.channel.send(`Changelog: ${package.repository.url}/releases`)
	}

	else if (command === 'github' || command === 'gh') {
		msg.channel.send(`Github: ${package.repository.url}`)
	}

	else if (command === 'changelog' || command === 'cl' || command === 'changes') {
		args.includes('latest') 
		? msg.channel.send(`Latest changelog: ${package.repository.url}/releases/latest`)
        : msg.channel.send(`Changelog: ${package.repository.url}/releases`)
	}

	else if (command === 'suggest') {
		suggest(msg, args)
	}

	else if (command === 'votes') {
		process.env.MEDIEVAL_ENGINEERS_NET_API_KEY
		? votes(msg)
		: msg.channel.send('The votes feature is currently disabled')
	}

	else if (command === 'poll') {
		poll(bot, msg, args)
  }
    
  else if (command === 'chat') {
		checkIfAdmin(msg, () => chat(msg, args))
  }
    
  else if (command === 'claims') {
		checkIfAdmin(msg, () => claims(msg, args))
  }
    
  else if (command === 'factions') {
		checkIfAdmin(msg, () => factions(msg, args))
  }
    
  // else if (command === 'checkclaims') {
	// 	checkClaims(bot, msg, args)
  // }

  // else if (command === 'getClaims') {
	// 	checkIfAdmin(msg, () => getClaims(msg, args))
	// }
	
	else if (command === 'createserver') {
		checkIfAdmin(msg, () => createServer(msg, args))
  }
    
  else if (command === 'listservers') {
		checkIfAdmin(msg, () => listServers(msg))
	}
})

bot.on('error', err => {
	console.log('Error', err)
})

// https://discordapp.com/oauth2/authorize?client_id=248564950136651776&scope=bot
bot.login(process.env.DISCORD_ACCESS_TOKEN);
