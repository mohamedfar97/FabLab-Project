const mongoose = require('mongoose');
const { User } = require("../models/user");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FabLab' , { useNewUrlParser: true } );


const initializeAdmin = () => {

    let found = false;

    User.findOne( {username: "admin"} )
        .then( (admin) => {
            if ( admin ) {
                console.log("Admin Already Exists");
            } else {
                let adminBody = {
                    username: "admin",
                    name: "admin",
                    email: "admin@example.com",
                    role: "admin",
                    isAdmin: true,
                    isVerified: true,
                    isReviewed: true,
                    password: "admin123",
                    phone: "01000401382",
                    gender: "male",
                };

                let admin = new User(adminBody);

                admin.save()
                    .then( (newAdmin) => {
                        newAdmin.save()
                            .then((user) => {
                                console.log("Admin Created");
                                return user.generateAuthToken();
                            })
                    }).catch( (error) => {
                    console.log("Cannot Generate Admin" , error);
                })
            }
        });
};

initializeAdmin();

module.exports = {mongoose};

