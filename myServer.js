var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.get('/gitlab/test', (req,res) => {
    request.get("http://google.com/")
        .on('response', (response) => {
            console.log(response);
            res.send(response);
    })
});

app.post('/register', userCtrl.registerUser);
app.post('/logIn' ,  userCtrl.logIn);
app.get('/profile/:id' , userCtrl.profile);
app.post('/editProfile/:id' , userCtrl.editProfile);
