const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./dbConnect/dbConnect');
const {authenticate} = require('./middleware/authentication');
const userCtrl =  require('./controllers/userController');
const gitLabCtrl =  require('./controllers/gitLabController');
const messagesCtrl =  require('./controllers/messagesController')

const app = express();

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
app.get('/profile/:id', userCtrl.profile);
app.post('/register', userCtrl.registerUser);
app.post('/logIn', userCtrl.logIn);
app.post('/editProfile/:id', userCtrl.editProfile);

//----------------------------GitLab--------------------------
app.get('/gitlab/getGroups/:token', gitLabCtrl.getGroups);
app.get('/gitlab/getProjects/:token', gitLabCtrl.getProjects);
app.get('/gitlab/getProjectFiles/:token/:projectId', gitLabCtrl.getProjectFiles);
app.get('/gitlab/getSubdirectoriesContent/:token/:projectId/:path', gitLabCtrl.getSubdirectoriesContent);
app.get('/gitlab/getFile/:token/:projectId/:path', gitLabCtrl.getFile);
app.get('/gitlab/downloadProject/:token/:projectId/:projectName',gitLabCtrl.downProject);
app.get('/gitlab/getProjectCommits/:token/:projectId' , gitLabCtrl.getProjectCommits);
app.post('/gitlab/uploadFile/:token/:projectId', gitLabCtrl.uploadFile);

//----------------------------Messages------------------------
app.get('/messages/getSentMessages/:id', messagesCtrl.viewSentMessages);
app.get('/messages/getReceivedMessages/:id', messagesCtrl.viewReceivedMessages);
app.post('/messages/sendMessage', messagesCtrl.sendMessage);