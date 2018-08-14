var express = require('express');


var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');

var app = express();

app.post('/register', userCtrl.registerUser);

app.listen(3000 , () => {
    console.log("Server up on port 3000");
})