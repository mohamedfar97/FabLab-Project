var {User} = require("../models/user");

module.exports.isAuthenticated = function(req , res , next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(user){
      req.user = user ;
      req.token = token ;
      next();
    } else{
      return res.status(401).send();
    }

  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports.isValidEmail = function( req,res,next ) {

    let userEmail = req.params.email;

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