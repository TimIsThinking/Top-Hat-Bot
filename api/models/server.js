const mongoose = require('mongoose');

const Server = mongoose.model('Server', { 
    name: {
        type: String,
        required: true,
        unique: true
    },
    game: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    port: {
        type: String,
        required: true
    },
    apiAddress: {
        type: String,
        required: false
    },
    apiPort: {
        type: String,
        required: false
    },
    apiKey: {
        type: String,
        required: false
    }
});

module.exports = Server