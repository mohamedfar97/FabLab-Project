const {ObjectID} = require("mongodb");

const {User} = require("../models/user");
const {Messages} = require("../models/messages");

module.exports.isValidSender = function ( req,res,next ) {
    let senderUsername = req.body.sender || req.params.username;

    User.findOne( {username: senderUsername })
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Sender Username"
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

module.exports.isValidReceiver = function ( req,res,next ) {
    let receiverUsername = req.body.receiver || req.params.username;

    User.findOne( {username: receiverUsername })
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Receiver Username"
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

module.exports.isValidMessageId = function ( req,res,next ) {
    let messageId = req.params.messageId;

    if ( ! ObjectID.isValid(messageId) ) {
        return res.status(400)
            .send({
                errMsg: "Invalid User ID"
            })
    }

    Messages.findById( messageId )
        .then( (message) => {
            if ( message ) {
                next()
            } else {
                return res.status(400)
                    .send({
                        errMsg: "Invalid Message ID"
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