const _ = require("lodash");
const bcrypt = require('bcryptjs');
const {User} = require("../models/user");
const {ObjectID} = require("mongodb");

module.exports.registerUser = ( req,res ) => {

    let body = _.pick(req.body,['name','email','password','role','phone','gender']);

    if ( body.role !== "admin") {
        let user = new User(body);
        user.save()
            .then( (user) => {
                return res.status(200)
                    .send({
                        msg: "Waiting For Admin Approval",
                        data: user
                    })
            }).catch( () => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Create User"
                })
        })
    }

};

module.exports.logIn = ( req,res ) => {

  let email = req.body.email;
  let password = req.body.password;

  User.findOne({'email' : email} , function(err , user) {

      if ( user ) {
          if ( ! user.isVerified ) {
              return res.status(401)
                  .send({
                      errMsg: "Your Account Isn't Verified."
                  })
          }
      } else {
          return res.status(404)
              .send({
                  errMsg: "No Such User"
              })
      }

    bcrypt.compare(password, user.password , (err , result) => {
      if ( err ) {
          return res.status(401).send({
              errMsg:"Mismatched Passwords."
          })
      }
      if( result ) {
          let i = 0;
          while ( i < user.tokens.length ) {
              if ( user.tokens[i].access === "auth" ) {
                  break;
              }
              i++;
          }
        res.header('x-auth' , user.tokens[i].token );
        return res.status(200).send({
            msg:"User Logged In",
            data:user
        });
      } else {
        return res.status(400).send({
            errMsg:"Cannot Login User. :("
        });
      }
    });
  });
};

module.exports.viewAllUsers = ( req,res ) => {

    User.find()
        .then( (users) => {
            if ( users ) {
                return res.status(200)
                    .send({
                        msg: "Fetched All System Users.",
                        data: users
                    })
            } else {
                return res.status(404)
                    .send({
                        errMsg: "The System Has No Users."
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Fetch Users Information",
                    err: error
                })
        })

};

module.exports.getAllPendingUsers = ( req,res ) => {
    User.find({
        isReviewed: false
    }).then( (users) => {
        return res.status(200)
            .send({
                msg: "Retrieved Pending Users",
                data: users
            });
    }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Retrieve Pending Users.",
                err:error
            })
    })
};

module.exports.viewUnverifiedUsers = ( req,res ) => {

    User.find({
        isVerified: false
    }).then( (users) => {
        if ( users ) {
            return res.status(200)
                .send({
                    msg: "Retrieved All Unverified Users",
                    data: users
                })
        } else {
            return res.status(404)
                .send({
                    errMsg: "There Are Currently No Unverified Users"
                })
        }
    }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Fetch Users Information",
                err: error
            })
    })

};

module.exports.verifyUser = ( req,res ) => {

    let userId = req.body.userId;
    let adminId = req.body.adminId;
    let verified = req.body.verified;

    if ( ! ObjectID.isValid(adminId) ) {
        return res.status(400)
            .send({
                errMsg: "Invalid Admin ID."
            })
    }

    if ( ! ObjectID.isValid(userId) ) {
        return res.status(400)
            .send({
                errMsg: "Invalid User ID."
            })
    }

    if ( ! _.isBoolean(verified) ) {
        return res.status(400)
            .send({
                errMsg: "Invalid Verification Status."
            })
    }


    User.findById( adminId )
        .then( (user) => {
            if ( user ) {
                if ( user.role !== "admin" ) {
                    return res.status(401)
                        .send({
                            errMsg: "You Are Not Allowed To Verify Users."
                        })
                }
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Admin."
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Retrieve Admin Info",
                    err: error
                })
    });


    let newInfo = {
      isReviewed: true,
      isVerified: verified
    };

    User.findByIdAndUpdate( userId , newInfo , { new:true } )
        .then( (user) => {
            if ( user ) {
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
            } else {
                return res.status(404)
                    .send({
                        errMsg:"No Such User Was Found To Verify"
                    })
            }
        }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Retrieve User Info",
                err: error
            })
    });
};

module.exports.addAdmin = ( req,res ) => {

    let body = _.pick(req.body,['name','email','password','phone','gender']);
    body.role = "admin";
    let user = new User(body);

    user.save()
        .then( (user) => {
            return res.status(200)
                .send({
                    msg: "Added Admin.",
                    data: user
                })
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Create New Admin",
                    err: error
                })
    })

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
                    .then( (token) => {
                        return res.header('x-auth', token).status(200).send({
                            msg:"Profile Updated.",
                            data:user
                        });
                    })
                    .catch( (err) => {
                        return res.status(400).send({
                            errMsg:"Cannot Generate Token.",
                            data:err
                        });
                    });
            }).catch( (err) => {
                return res.send({
                    errMsg:"Cannot Update Profile.",
                    data:err
                });
        })
    } else{
        return res.status(400).send({
            errMsg : "You Cannot Edit These Properties."
        });
    }
};