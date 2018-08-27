var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var logger = require('morgan');
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

// app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.listen(3000 , () => {
    console.log("Server up on port 3000");
})


app.get('/gitlab/test' , (req,res)=>{
https.get('https://www.gitlab.com/api/v4//projects/7922086/repository/tree/?private_token=bXnG_t4YzxAaytvvLLAy&per_page=100',(resp)=>{



    console.log(JSON.parse(resp));
    res.send(resp);



});



});
app.post('/register', userCtrl.registerUser);
app.post('/logIn' ,  userCtrl.logIn);
app.get('/profile/:id' , userCtrl.profile);
