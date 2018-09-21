const mongoose = require('mongoose');
const validator = require('validator');

const MessageSchema = mongoose.Schema({
    sender:{
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is an invalid email'
        }
    },
    receiver:{
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is an invalid email'
        }
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