var _ = require("lodash");
var bcrypt = require('bcryptjs');
var {User} = require("../models/user");
const {ObjectID} = require("mongodb");

module.exports.registerUser = ( req,res ) => {

    var body = _.pick(req.body,['name','email','password','role','phone','gender']);
    var user = new User(body);

    user.save().then( (user) => {
      return user.generateAuthToken();
    }).then((token)=>{
      res.header('x-auth', token).send(user);
    }).catch( (err1) => {
        return res.status(400).send({
            errMsg:"Cannot Generate Token.",
            data:err1
        });
    }).catch( (err2) => {
        return res.status(400).send({
            errMsg:"Missing Registration Inputs",
            data:err2
        })
    })
};

module.exports.logIn = ( req,res ) => {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({'email' : email} , function(err , user) {

    bcrypt.compare(password, user.password , (err , result) => {
      if ( err ) {
          return res.status(401).send({
              errMsg:"Mismatched Passwords."
          })
      }
      if( result ) {
        // Should that be more generic ? (Not by position)
        res.header('x-auth' , user.tokens[0].token );
        return res.status(200).send(user);
      } else {
        return res.status(400).send({
            errMsg:"Something Wrong Happened. :("
        });
      }
    });
  });
};

module.exports.profile = ( req,res ) => {
  let id = req.params.id;

  if ( ! ObjectID.isValid(id) ) {
      return res.status(400).send({
          errMsg:"Invalid User ID."
      })
  }

  User.findById(id).then( (user) => {
      if ( !user ) {
          return res.status(404).send({
              errMsg:"No Such User ID Exists."
          });
      }
      res.status(200).send(user);
  }).catch ( (err) => {
      res.status(500).send({
          errMsg:"Something Went Wrong :(",
          data:err
      });
  })

};

module.exports.editProfile = ( req,res ) => {
    const newData = req.body;
    const id = req.params.id;

    if ( ! ObjectID.isValid(id) ) {
        return res.status(400).send({
            errMsg:"Invalid User ID."
        })
    }

    if ( (! req.body.tokens) && (! req.body._id) ) {
        User.findByIdAndUpdate( id , newData , { new:true } )
            .then( (user) => {
                user.generateAuthToken()
                    .then((token)=>{
                        res.header('x-auth', token).send(user);
                    })
                    .catch( (err) => {
                        return res.status(400).send({
                            errMsg:"Cannot Generate Token.",
                            data:err
                        });
                    });
                return res.status(200).send({
                    msg:"Profile Updated.",
                    data:user
                });
            }).catch( (err) => {
                return res.send(err);
        })
    } else{
        res.status(400).send({
            errMsg : "You Cannot Edit This Properties."
        });
    }
};