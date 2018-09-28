const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    receiver:{
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    message:{
        type: String,
        required: true
    },
    messageDate:{
        type:Date,
        required: true
    }
});

const Messages = mongoose.model('Messages', MessageSchema);

module.exports = {Messages};