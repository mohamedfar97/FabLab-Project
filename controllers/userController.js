var _ = require("lodash");
var bcrypt = require('bcryptjs');
var {User} = require("../models/user");

module.exports.registerUser = ( req,res ) => {

    var body = _.pick(req.body,['name','email','password','role']);
    var user = new User(body);

    user.save().then( (user) => {
      return user.generateAuthToken();
    }).then((token)=>{
      var newUser =
      res.header('x-auth', token).send(user);
    }).catch( (err) => {
        return res.status(400).send(err);
    })
};

module.exports.logIn = (req,res) => {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({'email' : email} , function(err , user) {

    bcrypt.compare(password, user.password , (err , result)=>{
      console.log(result);
      if(result){
        res.header('x-auth' , user.tokens[0].token );
        return res.status(200).send(user);
      }else{
        return res.status(400).send(err);
      }
    });
  });

};
