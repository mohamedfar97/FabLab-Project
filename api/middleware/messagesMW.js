const {ObjectID} = require("mongodb");

const {User} = require("../models/user");
const {Messages} = require("../models/messages");

module.exports.isValidSender = function ( req,res,next ) {
    let senderEmail = req.body.sender || req.params.email;

    User.findOne( {email: senderEmail })
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Sender Email"
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
    let receiverEmail = req.body.receiver || req.params.email;

    User.findOne( {email: receiverEmail })
        .then( (user) => {
            if ( user ) {
                next()
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Receiver Email"
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