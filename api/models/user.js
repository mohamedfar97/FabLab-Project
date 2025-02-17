const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true
    },
    role: {
      type: String,
      enum: ["ceo", "foundation manager", "education manager",
      "education specialist", "makerspace manager", "flow manager",
      "flinc manager", "fixed fablab manager", "saudia lab manager",
      "lab specialist", "foundation admin", "public relation", "accountant","admin"],
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false
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
  return _.pick(userObject , ['name','email','role','phone','gender','_id']);
};

UserSchema.methods.generateAuthToken = function(){

  let user = this;
  let access = 'auth';
  let adminAccess = '';

  if ( user.role === "admin" && user.isAdmin ) {
      adminAccess = 'full';
  }
  else if ( user.role !== 'admin' && user.isAdmin ) {
      adminAccess = 'half';
  }
  else if ( user.role !== 'admin' && !user.isAdmin ) {
      adminAccess = 'none';
  }

  let token = jwt.sign({
      _id : user._id.toHexString(),
      name: user.name,
      username: user.username,
      adminAccess,
      access
    },'secret').toString();

  let i = 0;

  while ( i < user.tokens.length ) {
    if ( user.tokens[i].access === "auth" ) {
        user.tokens.splice(i,1);
        user.tokens.push({access , token});
        break;
     }
     i++;
  }

  if ( i === user.tokens.length ) {
      user.tokens.push({access , token});
  }

  return user.save().then(() => {
    return token;
  });
};


UserSchema.pre('save' , function(next){
  var user = this;
  if( user.isModified('password') ){
    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(user.password,salt, (err , hash) => {
        user.password = hash;
        next();
      });
    })
  }else{
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
