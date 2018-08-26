var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');
var {authenticate} = require('./middleware/authentication');
var cors = require('cors');
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

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.listen(3000 , () => {
    console.log("Server up on port 3000");
})



app.post('/register', userCtrl.registerUser);
app.post('/logIn' ,  userCtrl.logIn);
app.get('/profile/:id' , userCtrl.profile);
