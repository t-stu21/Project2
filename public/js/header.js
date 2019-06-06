var passport = require('passport');
var authController = require('../controllers/authcontroller.js');
var auth = require('../../routes/auth.js');
var db = require('../models');


$(document).ready(function () {


    getCalGoal(function () {
        app.get('/api/users/:id', function (req, res) {
            db.User.findOne({
                where: {
                    id: id
                }
            })
                .then((dbUsers) => {
                    res.render('main', '#goals', {
                        dbUsers: db.Users.daily_cal
                    });
                })
                .catch()
                .then(function (err) {
                    res.status(500).send(err);
                });
        });
    });

});