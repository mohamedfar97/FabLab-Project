const mongoose = require('mongoose');
const {ObjectID} = require("mongodb");
const validator = require('validator');

const MessageSchema = mongoose.Schema({
    sender:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is an invalid email'
        }
    },
    receiver:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is an invalid email'
        }
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