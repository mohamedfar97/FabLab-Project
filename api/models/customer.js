const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {
    Customer
};