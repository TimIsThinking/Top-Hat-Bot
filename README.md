# Top Hat Bot

Features include
* Getting server information for a medieval engineers server
* Getting player information for a medieval engineers server

## Prerequisites

[Node.js](https://nodejs.org/en/) >= 8.11.1

Create a .env file in your project directory and setup environment variables
.env.example contains the used variable names

```
DISCORD_ACCESS_TOKEN:             Your discord bot access token, you can create a bot at https://discordapp.com/developers/applications/me/create
MEDIEVAL_DS_ADDRESS:              IP Address of your Medieval Engineers server
MEDIEVAL_DS_PORT:                 Port of your Medieval Engineers server
MEDIEVAL_API_PORT:                Port of your Medieval Engineers API
MEDIEVAL_ENGINEERS_NET_API_KEY:   (Optional) Your medieval-engineers.net server api key
MEDIEVAL_ENGINEERS_NET_SERVER_ID: (Optional) Your medieval-engineers.net server id
MONGODB_URL:                      MongoDB database connection url (srv)
```

## Install

Clone the repository

`git clone git@github.com:13Tim37/Top-Hat-Bot.git`

Set up environment variables

Install packages

`npm install`

Run the bot

`npm run start`

Or run the bot in dev mode with

`npm run start-dev`
