const {User} = require("../models/user");
const {Customer} = require("../models/customer");
const {ObjectID} = require("mongodb");

module.exports.isAuthenticated = function( req,res,next ) {

  let token = req.header('x-auth');

  User.findByToken(token)
      .then( (user)=>{
            if ( user ) {
                req.user = user ;
                req.token = token ;
                next();
            } else {
                return res.status(401)
                    .send({
                        errMsg: "No Such Token."
                    });
            }
       }).catch( (error) => {
            return res.status(401)
                .send({
                    errMsg: "You Are Not An Authenticated User.",
                    err: error
                });
        });
};

module.exports.isValidUserId = function( req,res,next ) {

  let userId = req.params.id;

  if ( ! ObjectID.isValid(userId) ) {
      return res.status(400)
          .send({
              errMag: "Invalid User ID."
          })
  }

  User.findById(userId)
      .then( (user) => {
          if ( user ) {
              next()
          } else {
              return res.status(404)
                  .send({
                      errMsg: "Cannot Find User."
                  })
          }
      }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Retrieve User Information.",
                    err: error
            })
         })

};

module.exports.isValidAdminId = function ( req,res,next ) {

    let adminId = req.params.adminId || req.body.adminId;

    if ( ! ObjectID.isValid(adminId) ) {
        return res.status(400)
            .send({
                errMsg: "Invalid Admin ID."
            })
    }

    User.findById(adminId)
        .then( (user) => {
            if ( user ) {
                if ( user.isAdmin ) {
                    next();
                } else {
                    return res.status(401)
                        .send({
                            errMsg: "You Are Not An Admin"
                        })
                }
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Admin User."
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Fetch User Information",
                    err: error
                })
    })

};

module.exports.isValidEmail = function( req,res,next ) {

    let userEmail = req.params.email || req.body.email;

    User.findOne( {email: userEmail} )
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find User Email"
                    })
            }
        }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Retrieve User Information",
                err: error
            })
    })

};

module.exports.isValidUsername = function( req,res,next ) {

    let reqUsername = req.params.username || req.body.username;

    User.findOne( {username: reqUsername} )
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Username"
                    })
            }
        }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Retrieve User Information",
                err: error
            })
    })

};

module.exports.isValidCustomerId = function( req,res,next ) {

    let customerId = req.params.customerId || req.body.customerId;

    Customer.findById( customerId )
        .then( (customer) => {
            if ( customer ) {
                next();
            } else {
                return res.status(404)
                    .send({
                        errMsg: "No Such Customer ID."
                    })
            }
        }).catch( (err) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Search For Customer.",
                error: err
            })
    });

};



module.exports.isCEO = ( req, res, next ) => {
  if ( req.user.role !== "ceo" ) {
    return res.status(401).send();
  }
  next();
};

module.exports.isFoundationManager = ( req, res, next ) => {
    if ( req.user.role !== "foundation manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isEducationManager = ( req, res, next ) => {
    if ( req.user.role !== "education manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isEducationSpecialist = ( req, res, next ) => {
    if ( req.user.role !== "education specialist" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isMakerspaceManager = ( req, res, next ) => {
    if ( req.user.role !== "makerspace manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isFlowManager = ( req, res, next ) => {
    if ( req.user.role !== "flow manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isFlincManager = ( req, res, next ) => {
    if ( req.user.role !== "flinc manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isFixedFablabManager = ( req, res, next ) => {
    if ( req.user.role !== "fixed fablab manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isSaudiaLabManager = ( req, res, next ) => {
    if ( req.user.role !== "saudia lab manager" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isLabSpecialist = ( req, res, next ) => {
    if ( req.user.role !== "lab specialist" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isFoundationAdmin = ( req, res, next ) => {
    if ( req.user.role !== "foundation admin" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isPublicRelation = ( req, res, next ) => {
    if ( req.user.role !== "public relation" ) {
        return res.status(401).send();
    }
    next();
};

module.exports.isAccountant = ( req, res, next ) => {
    if ( req.user.role !== "accountant" ) {
        return res.status(401).send();
    }
    next();
};