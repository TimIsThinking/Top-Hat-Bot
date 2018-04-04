const Gamedig = require('gamedig')

const gamedig = (config, callback, callbackError) => {

	Gamedig.query(config).then((state) => {
		callback(state)
	}).catch((error) => {
		console.error('error', error)
		callbackError(error)
	});
}

module.exports = gamedig