const mongoose = require('mongoose');
const validator = require('validator');


const ClientRegistrationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    date: {
        type:Date,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is an invalid email'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /01\d{9}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['male','Male','female','Female']
    },
    address: {
        city: {type:String,required:true},
        street: {type:String,required:true},
        gov:{type:String,required:true}
    },
    age: {
        type: Boolean,
        required: true
    },
    occupation:{
        type:String,
        required:true,
        enum:["student","university","post graduate","professional"]
    },
    purpose_of_visit:{
        type:String,
        required:true,
        enum:["machine and electronics","space use","walk in user consultant","lab tour"]
    }
});

const ClientRegistration = mongoose.model('ClientRegistration', ClientRegistrationSchema);

module.exports = {
    ClientRegistration
};