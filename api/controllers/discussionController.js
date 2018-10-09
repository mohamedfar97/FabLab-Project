const _ = require("lodash");
const {ObjectID} = require("mongodb");

const {GroupMessage} = require("../models/group-messages");
const {Discussion} = require("../models/discussion");

module.exports.getDiscussionTopMessages = ( req,res ) => {

    let discussion = req.params.discussion;

    console.log(discussion);

    GroupMessage.find({project : discussion})
        .then((messages)=>{
            return res.status(200)
                .send({
                    msg: "Fetched Discussions",
                    data : messages.slice(messages.length-20,messages.length)
            })
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Fetch Discussion",
                    err: error
                })
        })
};

module.exports.createDiscussion = ( req,res ) => {

    let discName = req.body.name;
    let discBody = {
        name: discName
    };

    let newDisc = new Discussion(discBody);

    newDisc.save()
        .then( (disc) => {
            return res.status(200)
                .send({
                    msg: "Discussion Created",
                    data: disc
                })
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Create Discussion",
                    err: error
                })
    })

};

module.exports.addContributor = ( req,res ) => {

    let contrId = req.body.userId;
    let discId = req.body.discId;

    if ( ! ObjectID.isValid(discId) ) {
        return res.status(404)
            .send({
                errMsg: "Invalid Discussion ID"
            })
    }

    Discussion.findById(discId)
        .then( (disc) => {
            if ( disc ) {
                disc.contributors.push(contrId);
                disc.save()
                    .then( (newDisc) => {
                        return res.status(200)
                            .send({
                                msg: "Contributor Added.",
                                data: newDisc
                            })
                    }).catch( (error) => {
                        return res.status(400)
                            .send({
                                errMsg: "Cannot Add Contributor",
                                err: error
                            })
                });
            } else {
                return res.status(404)
                    .send({
                        errMsg: "Cannot Find Discussion"
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Fetch Discussion Info",
                    err: error
                })
    })

};

module.exports.viewDiscussions = ( req,res ) => {

    Discussion.find({})
        .then( (discs) => {
            if ( discs ) {
                return res.status(200)
                    .send({
                        msg: "Fetched All Discussions",
                        data: discs.reverse()
                    })
            } else {
                return res.status(200)
                    .send({
                        msg: "No Discussions Found.",
                        data: discs
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot View Discussions",
                    err: error
                })
    })

};