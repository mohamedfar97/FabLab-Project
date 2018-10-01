const mongoose = require('mongoose');

const DiscussionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contributors : [],
    messages : []
});

const Discussion = mongoose.model('Discussion', DiscussionSchema);

module.exports = {Discussion};