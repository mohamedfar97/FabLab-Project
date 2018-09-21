const _ = require("lodash");

const {Messages} = require("../models/messages");

module.exports.sendMessage = ( req,res ) => {
    let body = _.pick(req.body, ['sender', 'receiver', 'message','subject']);
    body.messageDate = new Date();

    let message = new Messages(body);

    message.save()
        .then ( (message) => {
            return res.status(200)
                .send( {
                    msg: "Message Sent",
                    data: message
                })
        }).catch( (error) => {
            return res.status(400)
                .send( {
                    errMsg: "Cannot Send Message",
                    err: error
                })
    })

};

module.exports.viewSentMessages = ( req,res ) => {

  let userEmail = req.params.email;

  Messages.find( {sender: userEmail} )
      .then( (messages) => {
          if ( messages.length > 0 ) {
              return res.status(200)
                  .send( {
                      msg: "Retrieved All Messages.",
                      data: messages.reverse()
                  })
          } else {
             return res.status(200)
                  .send( {
                      msg: "You Did Not Send Any Messages.",
                      data: messages
                  })
          }
      }).catch( (error) => {
          return res.status(404)
              .send( {
                  errMsg: "Cannot Load Messages.",
                  err: error
              })
  })

};

module.exports.viewReceivedMessages = ( req,res ) => {

    let userEmail = req.params.email;

    Messages.find( {receiver: userEmail} )
        .then( (messages) => {
            if ( messages.length > 0 ) {
                return res.status(200)
                    .send( {
                        msg: "Retrieved All Messages.",
                        data: messages.reverse()
                    })
            } else {
                return res.status(200)
                    .send( {
                        msg: "You Did Not Receive Any Messages.",
                        data: messages
                    })
            }
        }).catch( (error) => {
        return res.status(404)
            .send( {
                errMsg: "Cannot Load Messages.",
                err: error
            })
    })
};

module.exports.deleteMessage = ( req,res ) => {

    let messageId = req.params.messageId;

    Messages.findByIdAndDelete( messageId )
        .then( (message) => {
            if ( message ) {
                return res.status(200)
                    .send({
                        msg: "Message Deleted",
                        data: message
                    })
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Message To Be Deleted",
                        data:message
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Retrieve Message Info",
                    err: error
                })
    })

};