const _ = require("lodash");

const {ClientRegistration} = require("../models/clientRegistration");

module.exports.register = ( req,res ) => {
    let ClientForm = new ClientRegistration(req.body);

    ClientForm.save()
        .then( (form) => {
            return res.status(200)
                .send({
                    msg: "Form Submitted",
                    data: form
                })
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Create Form",
                    err: error
                })
    })
};
