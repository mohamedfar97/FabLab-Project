const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');

const {mongoose} = require('./dbConnect/dbConnect');

const authMW = require('./middleware/authMW');
const messageMW = require('./middleware/messagesMW');

const userCtrl =  require('./controllers/userController');
const gitLabCtrl =  require('./controllers/gitLabController');
const messagesCtrl =  require('./controllers/messagesController');

const discussionsCtrl =  require('./controllers/discussionController');

const clientCtrl =  require('./controllers/clientController');
const logs =  require('./controllers/logsController');


const {GroupMessage} = require('./models/group-messages');
const {Discussion} = require('./models/discussion');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

const server = app.listen(3000 , () => {
    console.log("Server up on port 3000");
});

//----------------------------Sockets---------------------------

const io = socket(server);

io.on('connection', (socket) => {

    console.log("User Connected");
    console.log(socket.id);

    socket.on('joinDiscussion', (discInfo) => {

        let room = discInfo.room;
        let user = {
            _id: discInfo.userId,
            username: discInfo.userUsername,
            name: discInfo.userName
        };

        Discussion.findOne({name: room})
            .then((disc) => {
                if (disc) {
                    console.log(`User (${user.username}) has joined (${room}) discussion`);
                    socket.join(room);
                    socket.emit('updateContributors', disc);
                } else {
                    socket.emit('errorMessage', {
                        errMsg: 'No such discussion exists',
                        err: error
                    })
                }
            }).catch((error) => {
                socket.emit('errorMessage', {
                    errMsg: 'Cannot Send Your Message',
                    err: error
            })
        });
    });

    socket.on('discussionMessage', (userMessage) => {
        let userMsg = new GroupMessage(userMessage);

        userMsg.save()
            .then( (userMessage) => {
                return io.to(userMessage.discussion).emit('discussionMessage', userMessage );
        }).catch( (error) => {
            socket.emit('errorMessage', {
                errMsg: 'Cannot Send Your Message',
                err: error
            })
        });
    });

    socket.on('disconnect', () => {
       console.log('User Disconnected');
       console.log("-----------------------");
    });


});

//----------------------------User----------------------------
app.get('/profile/:id', authMW.isValidUserId, userCtrl.profile);
app.get('/viewAllUsers', userCtrl.viewAllUsers);
app.post('/register', userCtrl.registerUser);
app.post('/logIn', userCtrl.logIn);
app.post('/editProfile/:id', authMW.isValidUserId, userCtrl.editProfile);

//----------------------------Admin---------------------------
app.get('/admin/getPendingUsers/:adminId', authMW.isValidAdminId, userCtrl.getAllPendingUsers);
app.get('/admin/viewUnverifiedUsers/:adminId', authMW.isValidAdminId, userCtrl.viewUnverifiedUsers);
app.post('/admin/verifyUser/:adminId', authMW.isValidAdminId, userCtrl.verifyUser);
app.post('/admin/setAsAdmin/:adminId', authMW.isValidAdminId, authMW.isValidUsername, userCtrl.setAsAdmin);

//----------------------------Client--------------------------
app.post('/client/clientRegistration',clientCtrl.register);

//----------------------------GitLab--------------------------
app.get('/gitlab/getGroups/:token', gitLabCtrl.getGroups);
app.get('/gitlab/getProjects/:token', gitLabCtrl.getProjects);
app.get('/gitlab/getProjectFiles/:token/:projectId', gitLabCtrl.getProjectFiles);
app.get('/gitlab/getSubdirectoriesContent/:token/:projectId/:path', gitLabCtrl.getSubdirectoriesContent);
app.get('/gitlab/getFile/:token/:projectId/:path', gitLabCtrl.getFile);
app.get('/gitlab/downloadProject/:token/:projectId/:projectName/:commitId',gitLabCtrl.downProject);
app.get('/gitlab/getProjectCommits/:token/:projectId' , gitLabCtrl.getProjectCommits);
app.post('/gitlab/uploadFile/:token/:projectId', gitLabCtrl.uploadFile);

//----------------------------Messages------------------------
app.get('/messages/getSentMessages/:username', authMW.isValidUsername, messagesCtrl.viewSentMessages);
app.get('/messages/viewMessage/:messageId', messageMW.isValidMessageId, messagesCtrl.viewMessage);
app.get('/messages/getReceivedMessages/:username', authMW.isValidUsername, messagesCtrl.viewReceivedMessages);
app.post('/messages/sendMessage', messageMW.isValidSender, messageMW.isValidReceiver, messagesCtrl.sendMessage);
app.delete('/messages/deleteMessage/:messageId', messageMW.isValidMessageId, messagesCtrl.deleteMessage);


//---------------------------Discussions----------------------
app.get('/messages/getDiscussionTopMessages/:discussion', discussionsCtrl.getDiscussionTopMessages);
app.get('/messages/viewAllDiscussions', discussionsCtrl.viewDiscussions);
app.post('/messages/createDiscussion/:adminId',authMW.isValidAdminId, discussionsCtrl.createDiscussion);
app.post('/messages/addContributor/:adminId',authMW.isValidAdminId, discussionsCtrl.addContributor);
app.post('/messages/removeContributor/:adminId',authMW.isValidAdminId, discussionsCtrl.removeContributor);
app.post('/messages/userDiscussions',discussionsCtrl.viewUserDiscussions);
app.post('/messages/leaveDiscussion', discussionsCtrl.leaveDiscussion);
app.post('/messages/deleteDiscussion/:adminId',authMW.isValidAdminId, discussionsCtrl.deleteDiscussion);

//----------------------------Logs----------------------------
app.get('/machineLog/getMachineLogs', logs.viewMachineLogs);
app.post('/machineLog/reserveMachine/:customerId', authMW.isValidCustomerId, logs.reserveMachine);
app.post('/machineLog/viewMachineLogOnADay', logs.viewMachineLogsOnADay);


