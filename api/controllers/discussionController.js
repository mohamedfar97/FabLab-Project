const _ = require("lodash");
const {ObjectID} = require("mongodb");

const {GroupMessage} = require("../models/group-messages");
const {Discussion} = require("../models/discussion");
const {User} = require("../models/user");

module.exports.getDiscussionTopMessages = ( req,res ) => {

    let discussion = req.params.discussion;

    console.log(discussion);

    GroupMessage.find({discussion : discussion})
        .then((messages)=>{
            return res.status(200)
                .send({
                    msg: "Fetched Discussions",
                    data : messages.slice(messages.length-20,messages.length)
            })
        }).catch( (error) => {
            return res.status(422)
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
            return res.status(422)
                .send({
                    errMsg: "Cannot Create Discussion",
                    err: error
                })
    })

};

module.exports.addContributor = ( req,res ) => {

    let contributorUsername = req.body.username;
    let discName = req.body.disc;
    let user = {};

    User.findOne( {username:contributorUsername} )
        .then( (contributor) => {
            if( contributor ) {
                user._id = contributor._id;
                user.name = contributor.name;
                user.username = contributor.username;

                Discussion.findOne( {name:discName} )
                    .then( (disc) => {
                        if ( disc ) {
                            for( let i = 0; i < disc.contributors.length; i++ ) {
                                if( disc.contributors[i].username === contributorUsername ) {
                                    return res.status(200)
                                        .send({
                                            msg: "This user is already a contributor to this discussion."
                                        })
                                }
                            }

                            disc.contributors.push(user);
                            disc.save()
                                .then( (newDisc) => {
                                    return res.status(200)
                                        .send({
                                            msg: "Contributor Added.",
                                            data: newDisc
                                        })
                                }).catch( (error) => {
                                return res.status(422)
                                    .send({
                                        errMsg: "Cannot Add Contributor",
                                        err: error
                                    })
                            });
                        } else {
                            return res.status(422)
                                .send({
                                    errMsg: "Cannot Find Discussion"
                                })
                        }
                    }).catch( (error) => {
                    return res.status(422)
                        .send({
                            errMsg: "Cannot Fetch Discussion Info",
                            err: error
                        })
                })

            }
            else {
                return res.status(422)
                    .send({
                        errMsg: "No such user exists."
                    })
            }
        }).catch( (error) => {
        return res.status(422)
            .send({
                errMsg: "Cannot fetch user.",
                err: error
            })
    });

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
            return res.status(422)
                .send({
                    errMsg: "Cannot View Discussions",
                    err: error
                })
    })

};

module.exports.removeContributor = ( req,res ) => {

    let contributorUsername = req.body.username;
    let discName = req.body.disc;

    Discussion.findOne( { name:discName } )
        .then( (disc) => {
            if( disc ) {
                for (let i = 0; i < disc.contributors.length; i++) {
                    if (disc.contributors[i].username === contributorUsername) {
                        disc.contributors.splice(i,1);
                        disc.save();
                        return res.status(200)
                            .send({
                                msg: "User removed as a contributor."
                            })
                    }
                }

                return res.status(403)
                    .send({
                        errMsg: "User is not a contributor in this discussion."
                    })

            } else {
                return res.status(422)
                    .send({
                        errMsg: "Cannot find such discussion."
                    })
            }
        })

};

module.exports.viewUserDiscussions = ( req,res ) => {

    let username = req.body.username;
    let userDiscussions = [];

    User.findOne( {username} )
        .then( (user) => {
            if( user ) {}
            else {
                return res.status(422)
                    .send({
                        errMsg: "No such user exists."
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .send({
                    errMsg: "Cannot fetch user.",
                    err: error
                })
    });

    Discussion.find()
        .then( (discs) => {
            if(discs) {
                for(let i = 0; i < discs.length; i++ ) {
                    for(let j = 0; j < discs[i].contributors.length; j++) {
                        if( discs[i].contributors[j].username === username) {
                            userDiscussions.push(discs[i]);
                            break;
                        }
                    }
                }

                if( userDiscussions.length === 0 ) {
                    return res.status(200)
                        .send({
                            msg: "You are not a contributor in any discussions.",
                            data: userDiscussions
                        })
                } else {
                    return res.status(200)
                        .send({
                            msg: "Fetch all contributed discussions.",
                            data: userDiscussions
                        })
                }

            } else {
                return res.status(422)
                    .send({
                        errMsg:"No discussions exists."
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .send({
                    errMsg: "Cannot fetch discussions.",
                    err: error
                })
    })
};

module.exports.leaveDiscussion = ( req,res ) => {

    let username = req.body.username;
    let discussion = req.body.disc;

    Discussion.findOne( {name:discussion} )
        .then( (disc) => {
            if( disc ) {
                for(let i = 0; i < disc.contributors.length; i++) {
                    if( disc.contributors[i].username === username ) {
                        disc.contributors.splice(i, 1);
                        disc.save();
                        return res.status(200)
                            .send({
                                msg: "User removed from discussion."
                            })
                    }
                }
                return res.status(200)
                    .send({
                        msg: `${username} is not a contributor in ${disc.name}`
                    })
            } else {
                return res.status(422)
                    .send({
                        errMsg: "Cannot find such discussion."
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .send({
                    errMsg: "Cannot fetch discussion.",
                    err: error
                })
    })

};

module.exports.deleteDiscussion = ( req,res ) => {

    let discussion = req.body.disc;

    Discussion.findOneAndDelete( {name:discussion} )
        .then( (disc) => {
            if(disc) {
                GroupMessage.remove({discussion:discussion}).exec();
                return res.status(200)
                    .send({
                        msg: "Discussion Deleted."
                    })
            } else {
                return res.status(422)
                    .send({
                        errMsg: "Cannot Find Discussion."
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .send({
                    errMsg: "Cannot Fetch Discussion Info.",
                    err: error
                })
    })

};