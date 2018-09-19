const https = require('https');
const fs = require('fs');
const path = require('path');
const request = require('request');

const gitLabHost = 'gitlab.com';



const getFromGitLab = ( options , ClientResponse ) => {
    https.get( options , function (res) {
        var responseString = "";

        res.on("data", function (data) {
            responseString += data;
        });

        res.on("end", function () {
          ClientResponse.status(200)
              .send(responseString);
        });

        res.on("error", (err) => {
            ClientResponse.status(401).send({
                errMsg:"Something Went Wrong While Fetch Data.",
                data:err
            })
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
    getFromGitLab( options , res );
};

module.exports.getProjects = ( req,res ) => {
    var token = req.params.token;

    var options = {
        host: gitLabHost,
        path: '/api/v4/projects/?membership=true&private_token=' + token
    };

    getFromGitLab( options , res );
};

module.exports.getProjectFiles = ( req,res ) => {
    var projectId = req.params.projectId;
    var token = req.params.token;

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/tree/?per_page=100&private_token=' + token
    };
    getFromGitLab( options , res );
};

module.exports.getFile = ( req,res ) => {
    var projectId = req.params.projectId;
    var path = encodeURIComponent(req.params.path);
    var token = req.params.token;

    console.log(path);

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/files/' + path + '/?ref=master&private_token=' + token
    };
    getFromGitLab( options , res );
};

module.exports.uploadFile = ( req,res ) => {

    var projectId = req.params.projectId.trim();
    var token = req.params.token.trim();

    var options = {

        host:  gitLabHost ,
        path: "/api/v4/projects/"+projectId+"/repository/commits?private_token="+token,
        method : 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    };

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

    var body = JSON.stringify(req.body);

    request.write(body);
    request.end();

};

module.exports.downProject = ( req,res ) => {
    console.log("Start");
    let token = req.params.token;
    let projectId = req.params.projectId;
    let projectName = req.params.projectName;

    let url = 'https://gitlab.com/api/v4/projects/' + projectId
        + '/repository/archive?private_token=' + token;

    let filePath = path.join(__dirname , '../assets/' + projectName + '.tar.gz');
    let fileContent = fs.createWriteStream(filePath);

    let tempPath = path.join(__dirname , '../assets/Lasercutter-Projects-master.tar.gz');

    request.get( url )
        .on('error' , () => {
            console.log("Error Occurred !!");
            fileContent.end();
        })
        .on('data' , (data) => {
            fileContent.write(data);
        })
        .on('end' , () => {
            console.log("End Of Reading !!");
            fileContent.end();
            res.sendFile(tempPath);
        })
};

module.exports.getProjectCommits = ( req,res ) => {

    var projectId = req.params.projectId;
    var token = req.params.token;

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/commits?private_token=' + token
    };

    getFromGitLab( options , res );
};

module.exports.getSubdirectoriesContent = ( req,res ) => {

    var projectId = req.params.projectId;
    var token = req.params.token;
    var path = req.params.path;

    var options = {
        host: gitLabHost ,
        path: '/api/v4/projects/' + projectId + '/repository/tree/?per_page=100&private_token=' + token
        + '&path=' + path
    };

    getFromGitLab( options,res );
};
