var _ = require("lodash");
var https = require('https');

var sendToGitLab = ( options , ClientResponse ) => {
    https.get( options , function (res) {
        var responseString = "";

        res.on("data", function (data) {
            responseString += data;
        });

        res.on("end", function () {
            ClientResponse.send(JSON.parse(responseString));
        });
    });
};

module.exports.getGroups = ( req,res ) => {
    var token = req.params.token;

    var options = {
        host: 'gitlab.com',
        path: '/api/v4/groups/?private_token=' + token
    };
    sendToGitLab( options , res );
};

module.exports.getProjects = ( req,res ) => {
    var token = req.params.token;

    var options = {
        host: 'gitlab.com',
        path: '/api/v4/projects/?membership=true&private_token=' + token
    };

    sendToGitLab( options , res );
};

module.exports.getProjectFiles = ( req,res ) => {
    var projectId = req.params.projectId;
    var token = req.params.token;

    var options = {
        host: 'gitlab.com',
        path: '/api/v4/projects/' + projectId + '/repository/tree/?per_page=100&private_token=' + token
    };
    sendToGitLab( options , res );
};

module.exports.getFile = ( req,res ) => {
    var projectId = req.params.projectId;
    var path = req.params.path;
    var token = req.params.token;

    var options = {
        host: 'gitlab.com',
        path: '/api/v4/projects/' + projectId + '/repository/files/' + path + '/?ref=master&private_token=' + token
    };
    console.log(options.path);
    sendToGitLab( options , res );
};
