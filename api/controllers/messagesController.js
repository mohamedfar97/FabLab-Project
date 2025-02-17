const _ = require("lodash");

const {Messages} = require("../models/messages");

module.exports.sendMessage = ( req,res ) => {
    let body = _.pick(req.body, ['sender', 'receiver', 'message','subject']);
    body.messageDate = new Date();

    let message = new Messages(body);

    message.save()
        .then ( (message) => {
            return res.status(200)
                .json( {
                    msg: "Message Sent",
                    data: message
                })
        }).catch( (error) => {
            return res.status(422)
                .json( {
                    errMsg: "Cannot Send Message",
                    err: error
                })
    })

};

module.exports.viewSentMessages = ( req,res ) => {

  let reqUsername = req.params.username;

  Messages.find( {sender: reqUsername} )
      .then( (messages) => {
          if ( messages.length > 0 ) {
              return res.status(200)
                  .json( {
                      msg: "Retrieved All Messages.",
                      data: messages.reverse()
                  })
          } else {
             return res.status(200)
                  .json( {
                      msg: "You Did Not Send Any Messages.",
                      data: messages
                  })
          }
      }).catch( (error) => {
          return res.status(422)
              .json( {
                  err: error,
                  errMsg: "Cannot Load Messages."
              })
  })

};

module.exports.viewReceivedMessages = ( req,res ) => {

    let reqUsername = req.params.username;

    Messages.find( {receiver: reqUsername } )
        .then( (messages) => {
            if ( messages.length > 0 ) {
                return res.status(200)
                    .json( {
                        msg: "Retrieved All Messages.",
                        data: messages.reverse()
                    })
            } else {
                return res.status(200)
                    .json( {
                        msg: "You Did Not Receive Any Messages.",
                        data: messages
                    })
            }
        }).catch( (error) => {
        return res.status(422)
            .json( {
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
                    .json({
                        msg: "Message Deleted",
                        data: message
                    })
            } else {
                return res.status(422)
                    .json({
                        errMsg: "Cannot Find Message To Be Deleted",
                        data:message
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .json({
                    errMsg: "Cannot Retrieve Message Info",
                    err: error
                })
    })

};

module.exports.viewMessage = ( req,res ) => {

    let messageId = req.params.messageId;

    Messages.findById(messageId)
        .then( (message) => {
            if ( ! message ) {
                return res.status(422)
                    .json({
                        errMsg: "Cannot Find Message.",
                    })
            } else {
                return res.status(200)
                    .json({
                        msg: "Message Fetched.",
                        data: message
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .json({
                    errMsg: "Cannot Fetch Message Info.",
                    err: error
                })
    })

};