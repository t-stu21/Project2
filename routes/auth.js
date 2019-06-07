var passport = require('passport');
var authController = require('../controllers/authcontroller.js');
var db = require('../models');


module.exports = function (app) {

    app.get('/signup', authController.signup);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/signup'
    }
    ));

    app.get('/login', authController.login);


    app.post('/login', function (req, res, next) {
        //send email
        db.User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                res.redirect('signup');
            } else {
                var isMatched = bcrypt.compareSync(req.body.password, dbUser.password);

                if (isMatched) {
                    res.json(dbUser);
                } else {
                    res.status(500).send("get out");
                }
            }

        }).catch(function (err) {
            res.status(500).send(err);
        });
        //send password
        //find user by email
        //compare plain text PW to the saved PW
        //if good return back user 
        //if not return an err
    });

    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/dashboard',

    //     failureRedirect: '/login'
    // }

    // ));

    // app.get('/dashboard', isLoggedIn, authController.dashboard);

    // function isLoggedIn(req, res, next) {

    //     if (req.isAuthenticated())

    //         return next();

    //     res.redirect('/login');

    // }

    app.get('/logout', authController.logout);
}