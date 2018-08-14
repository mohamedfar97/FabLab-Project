var _ = require("lodash");

var {User} = require("../models/user");

module.exports.registerUser = ( req,res ) => {
    console.log("RU");
    var body = _.pick(req.body,['name','email','password']);
    var newUser = new User(body);

    newUser.save().then( (user) => {
        res.status(200).send(user);
    }).catch( (err) => {
        res.status(400).send(err);
    })
};