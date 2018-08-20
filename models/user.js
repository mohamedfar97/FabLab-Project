var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    role: {
      type: String,
      enum: ["ceo", "foundation manager", "education manager",
      "education specialist", "makerspace manager", "flow manager",
      "flinc manager", "fixed fablab manager", "saudia lab manager",
      "lab specialist", "foundation admin", "public relation", "accountant"],
      required: true,
      lowercase: true
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
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});


UserSchema.statics.findByToken = function(token) {

  var decoded ;

  try{
     decoded = jwt.verify(token , 'secret');
  }catch(e){
    return Promise.reject();
  }

  return User.findOne({'_id' : decoded._id,'tokens.token' : token , 'tokens.access' : 'auth'});
};


UserSchema.methods.toJSON = function (){
  var user = this ;
  var userObject = user.toObject();
  return _.pick(userObject , ['name' , 'email']);
};

UserSchema.methods.generateAuthToken = function(){

  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString() , access },'secret').toString();

  user.tokens.push({access , token});
  return user.save().then(() =>{
    return token;
  });
};


UserSchema.pre('save' , function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password , salt , (err , hash)=>{
        user.password = hash;
        next();
      });
    })
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
