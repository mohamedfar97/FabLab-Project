const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./dbConnect/dbConnect');

const authMW = require('./middleware/authMW');
const messageMW = require('./middleware/messagesMW');

const userCtrl =  require('./controllers/userController');
const gitLabCtrl =  require('./controllers/gitLabController');
const messagesCtrl =  require('./controllers/messagesController');
const clientCtrl =  require('./controllers/clientController');
const logs =  require('./controllers/logsController');

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
app.get('/profile/:id', authMW.isValidUserId, userCtrl.profile);
app.get('/getPendingUsers/:adminId', authMW.isValidAdminId, userCtrl.getAllPendingUsers);
app.get('/viewAllUsers', userCtrl.viewAllUsers);
app.get('/viewUnverifiedUsers/:adminId', authMW.isValidAdminId, userCtrl.viewUnverifiedUsers);
app.post('/register', userCtrl.registerUser);
app.post('/logIn', userCtrl.logIn);
app.post('/editProfile/:id', authMW.isValidUserId, userCtrl.editProfile);
app.post('/verifyUser/:adminId', authMW.isValidAdminId, userCtrl.verifyUser);
app.post('/addAdmin/:adminId', authMW.isValidAdminId, userCtrl.addAdmin);

//----------------------------Client------------------------
app.post('/client/clientRegistration',clientCtrl.register);

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
app.get('/messages/getSentMessages/:username', authMW.isValidUsername, messagesCtrl.viewSentMessages);
app.get('/messages/getReceivedMessages/:username', authMW.isValidUsername, messagesCtrl.viewReceivedMessages);
app.post('/messages/sendMessage', messageMW.isValidSender, messageMW.isValidReceiver, messagesCtrl.sendMessage);
app.delete('/messages/deleteMessage/:messageId', messageMW.isValidMessageId, messagesCtrl.deleteMessage);

//----------------------------Logs----------------------------
app.get('/machineLog/getMachineLogs', logs.viewMachineLogs);
app.post('/machineLog/reserveMachine/:customerId', authMW.isValidCustomerId, logs.reserveMachine);
app.post('/machineLog/viewMachineLogOnADay', logs.viewMachineLogsOnADay);




