var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./dbConnect/dbConnect');
var userCtrl =  require('./controllers/userController');
var {authenticate} = require('./middleware/authentication');
var app = express();

app.use(bodyParser.json());
app.post('/register', userCtrl.registerUser);
app.get('/test', authenticate , userCtrl.test);

app.listen(3000 , () => {
    console.log("Server up on port 3000");
})
