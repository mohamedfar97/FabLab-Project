var _ = require("lodash");

var {User} = require("../models/user");

module.exports.registerUser = ( req,res ) => {

    var body = _.pick(req.body,['name','email','password']);
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

module.exports.test = (req,res) => {

  res.send(req.user);

};
