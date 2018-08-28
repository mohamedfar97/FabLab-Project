var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');
var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');
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

app.get('/gitlab/test', (ClientRequest,ClientResponse) => {

  var options = {

    host: 'gitlab.com',
    path: '/api/v4/groups/?private_token=bXnG_t4YzxAaytvvLLAy'

  };


  https.get(options, function (res) {
    var responseString = "";

    res.on("data", function (data) {
        responseString += data;
        // save all the data from response
    });
    res.on("end", function () {
        console.log(responseString);
        ClientResponse.send(JSON.parse(responseString));
        // print to console when response ends
    });
});


});

app.post('/register', userCtrl.registerUser);
app.post('/logIn' ,  userCtrl.logIn);
app.get('/profile/:id' , userCtrl.profile);
app.post('/editProfile/:id' , userCtrl.editProfile);
