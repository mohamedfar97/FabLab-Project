const _ = require("lodash");

const {MachineLog} = require("../models/machineLog");

module.exports.reserveMachine = ( req,res ) => {

    let body = _.pick(req.body,['startDate','endDate','machineType','customerId']);

    let currentDate = new Date();

    let machineStartDate = new Date(body.startDate);
    let machineEndDate = new Date(body.endDate);

    if ( currentDate.getTime() > machineStartDate.getTime() ) {
        return res.status(400)
            .send({
                errMsg: "Cannot Start On Past Days."
            })
    }

    let hours = ( (machineEndDate.getTime() - machineStartDate.getTime()) / 1000 ) / 3600 ;

    if ( hours <= 0 ) {
        return res.status(400)
            .send({
                errMsg: "End Date Needs To Be Greater Than Start Date."
            })
    }

    if ( hours > 24 ) {
        return res.status(400)
            .send({
                errMsg: "Cannot Reserve More Than 24 hrs."
            })
    }

    // Still Need To Add Collision Detection.

    let machineLog = new MachineLog(body);

    machineLog.save()
        .then( (log) => {
            return res.status(200)
                .send({
                    msg: "Log Created.",
                    data:log
                })
        }).catch( (err) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Create Log.",
                error: err
            })
    })
};

module.exports.viewMachineLogs = ( req,res ) => {

    MachineLog.find()
        .then( (logs) => {
            if ( logs ) {
                return res.status(200)
                    .send({
                        msg: "Fetched All Logs.",
                        data: logs
                    })
            } else {
                return res.status(404)
                    .send({
                        errMsg: "No Logs Are Registered."
                    })
            }
        }).catch( (error) => {
            return res.status(400)
                .send({
                    errMsg: "Cannot Fetch Logs Info.",
                    err: error
                })
    })

};

module.exports.viewMachineLogsOnADay = ( req,res ) => {

    let searchDay = req.body.date;

    let searchDate = new Date(searchDay);

    MachineLog.find( {statDate: searchDate})
        .then( (logs) => {
            if ( logs ) {
                return res.status(200)
                    .send({
                        msg: "All Logs Fetched.",
                        data: logs
                    })
            } else {
                return res.status(404)
                    .send({
                        errMsg: "No Logs Where Registered On That Day"
                    })
            }
        }).catch( (error) => {
        return res.status(400)
            .send({
                errMsg: "Cannot Fetch Logs Info.",
                err: error
            })
    })

};