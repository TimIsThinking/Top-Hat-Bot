const mongoose = require('mongoose');

const Server = mongoose.model('Server', { 
    name: {
        type: String,
        required: true,
        unique: true
    },
    shouldJoin: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = Server