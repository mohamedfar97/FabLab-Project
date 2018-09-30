const mongoose = require('mongoose');

const GroupMessageSchema = mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    project:{
        type: String,
        required: true
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

const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema);

module.exports = {GroupMessage};