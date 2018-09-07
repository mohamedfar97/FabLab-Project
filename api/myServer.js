var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');
var gitLabCtrl =  require('./controllers/gitLabController');
var {authenticate} = require('./middleware/authentication');

var app = express();

app.use(
    cors({
      "exposedHeaders":"x-auth",
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
})
);
app.use(bodyParser.json());

app.listen(3000 , () => {
    console.log("Server up on port 3000");

});

//----------------------------User----------------------------
app.post('/register', userCtrl.registerUser);
app.post('/logIn', userCtrl.logIn);
app.get('/profile/:id', userCtrl.profile);
app.post('/editProfile/:id', userCtrl.editProfile);

//----------------------------GitLab----------------------------
app.get('/gitlab/getGroups/:token', gitLabCtrl.getGroups);
app.get('/gitlab/getProjects/:token', gitLabCtrl.getProjects);
app.get('/gitlab/getProjectFiles/:token/:projectId', gitLabCtrl.getProjectFiles);
app.get('/gitlab/getFile/:token/:projectId/:path', gitLabCtrl.getFile);
app.get('/gitlab/downloadProject/:token/:projectId/:projectName',gitLabCtrl.downProject);
app.post('/gitlab/uploadFile/:token/:projectId/:path/:commitMessage', gitLabCtrl.uploadFile);
