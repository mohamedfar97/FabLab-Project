const _ = require("lodash");
const async = require('async');

const {User} = require("../models/user");
const {Messages} = require("../models/messages");

module.exports.sendMessage = ( req,res ) => {
    let body = _.pick(req.body,['sender','receiver','message','sendingDate']);
    body.messageDate = new Date();

    let message = new Messages(body);

    message.save()
        .then( (message) => {
            User.findOne({email:message.sender})
                .then( (sendingUser) => {
                        User.findOne({email:message.receiver})
                            .then( (receivingUser) => {
                                sendingUser.sentMessages.push({
                                    messageId: message._id,
                                    receiverName: receivingUser.name
                                });
                                sendingUser.save()
                                    .then( () => {
                                        receivingUser.receivedMessages.push({
                                            messageId: message._id,
                                            senderName: sendingUser.name
                                        });
                                        receivingUser.save()
                                            .then( () => {
                                                return res.send(message);
                                            }).catch( (error) => {
                                            return res.send({
                                                msg: "Cannot Save in Received Messages",
                                                err: error
                                            })
                                        });
                                    }).catch( (error) => {
                                    return res.send({
                                        msg: "Cannot Save in Sent Messages",
                                        err: error
                                    })
                            }).catch( (error) => {
                            return res.send({
                                msg: "Cannot Find A Receiving User",
                                err: error
                            })
                        });
                    });

                });
        }).catch( (error) => {
            return res.send({
                msg: "Cannot Send Message",
                error: error
            });
    })
};

module.exports.viewSentMessages = ( req,res ) => {

  let id = req.params.id;
  let userSentMessages = [];

  User.findById(id)
      .then( (user) => {

          if ( user.sentMessages.length === 0 ) {
              return res.send({
                  msg: 'Cannot Find Any Messages',
                  data: userSentMessages
              });
          }

          for ( let i = 0 ; i < user.sentMessages.length ; i++ ) {
              Messages.findById(user.sentMessages[i].messageId)
                  .then( (message) => {
                      userSentMessages.push(message);
                      if ( i === (user.sentMessages.length - 1)) {
                          return res.send({
                              msg: 'Fetched All Messages',
                              data: userSentMessages
                          });
                      }
                  }).catch( (error) => {
                      return res.send({
                          msg: 'Cannot Find Any Messages',
                          data: userSentMessages,
                          err: error
                      })
              })
          }
      }).catch( (err) => {
      return res.send({
          msg: 'Cannot Find User',
          data: err
      });
  })
};

module.exports.viewReceivedMessages = ( req,res ) => {

    let id = req.params.id;
    let userReceivedMessages = [];

    User.findById(id)
        .then( (user) => {

            if ( user.receivedMessages.length === 0 ) {
                return res.send({
                    msg: 'Cannot Find Any Messages',
                    data: userReceivedMessages
                });
            }

            for ( let i = 0 ; i < user.receivedMessages.length ; i++ ) {
                Messages.findById(user.receivedMessages[i].messageId)
                    .then( (message) => {
                        userReceivedMessages.push(message);
                        if ( i === (user.receivedMessages.length - 1)) {
                            return res.send({
                                msg: 'Fetched All Messages',
                                data: userReceivedMessages
                            });
                        }
                    }).catch( (error) => {
                    return res.send({
                        msg: 'Cannot Find Any Messages',
                        data: userReceivedMessages,
                        err: error
                    })
                })
            }
        }).catch( (err) => {
        return res.send({
            msg: 'Cannot Find User',
            data: err
        });
    })
};