var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');
var mw = require('./middleware/authentication');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/register', userCtrl.registerUser);
app.post('/logIn' , userCtrl.logIn);
app.get('/profile/:id', userCtrl.profile);

app.listen(3000 , () => {
    console.log("Server up on port 3000");
})
