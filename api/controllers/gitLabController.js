var _ = require("lodash");
var https = require('https');
var url = require('url');

const gitLabHost = 'gitlab.com';


const sendToGitLab = ( options , ClientResponse ) => {
    https.get( options , function (res) {
        var responseString = "";

        res.on("data", function (data) {
            responseString += data;
        });

        res.on("end", function () {
            ClientResponse.status(200).send(responseString);
        });
    }).on("error", (err) => {
        ClientResponse.status(401).send({
            errMsg:"Something Went Wrong While Connecting To Gitlab's API.",
            data:err
        })
    });
};

module.exports.getGroups = ( req,res ) => {
    var token = req.params.token;

    var options = {
        host: gitLabHost,
        path: '/api/v4/groups/?private_token=' + token
    };
    sendToGitLab( options , res );
};

module.exports.getProjects = ( req,res ) => {
    var token = req.params.token;

    var options = {
        host: gitLabHost,
        path: '/api/v4/projects/?membership=true&private_token=' + token
    };

    sendToGitLab( options , res );
};

module.exports.getProjectFiles = ( req,res ) => {
    var projectId = req.params.projectId;
    var token = req.params.token;

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/tree/?per_page=100&private_token=' + token
    };
    sendToGitLab( options , res );
};

module.exports.getFile = ( req,res ) => {
    var projectId = req.params.projectId;
    var path = req.params.path;
    var token = req.params.token;

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/files/' + path + '/?ref=master&private_token=' + token
    };
    sendToGitLab( options , res );
};

module.exports.uploadFile = ( req,res ) => {

    var queryData = url.parse(req.url, true).query;

    projectId = req.params.projectId.trim();
    token = req.params.token.trim();



    var options = {

        host:  gitLabHost ,
        path: "/api/v4/projects/"+projectId+"/repository/commits?private_token="+token,
        method : 'POST',
        headers: {
            "Content-Type": "application/json"

        }

    }



    var request = https.request(options, (response) => {
        var responseBody;
        response.on('data', (chunk) => {

            responseBody += chunk ;
        });

        response.on('end', () => {
            console.log(responseBody)
          res.status(201).send(responseBody);
        });
    });

    request.on('error', (e) => {
        console.log(e.message);
    });

    var body = JSON.stringify(req.body)

    request.write(body)
    request.end();
};