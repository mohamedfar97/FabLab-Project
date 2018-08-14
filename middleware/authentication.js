var {User} = require("../models/user");


var authenticate = function(req , res , next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(user){
      req.user = user ;
      req.token = token ;
      next();
    }else{
      return res.status(401).send();
    }

  }).catch((e) => {
    res.status(401).send();
  });


};
module.exports = {authenticate};
