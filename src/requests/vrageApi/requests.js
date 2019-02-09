const getChat = [`http://${process.env.MEDEIVAL_DS_ADDRESS}:${process.env.MEDIEVAL_API_PORT}/vrageremote/v1/session/gamechat/world`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
]