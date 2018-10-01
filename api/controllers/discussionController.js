const _ = require("lodash");

const {GroupMessage} = require("../models/group-messages");
const {Discussion} = require("../models/discussion");

module.exports.getDiscussionTopMessages = ( req,res ) => {

    let discussion = req.params.discussion;

    console.log(discussion);
    GroupMessage.find({project : discussion}).then((messages)=>{
        return res.status(200).send({
            data : messages.slice(messages.length-20,messages.length)
        })
    }).catch({

    })
};



