var db = require('../models');
var schedule = require('./schedule');
var bcrypt = require('bcryptjs');

// var secureRoute = function () {
//   return passport.authenticate('local-login', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login'
//   })
// };

module.exports = function (app) {
  app.get('/api/users', function (req, res) {
    db.User.findAll({
      include: [
        db.WorkoutDay
      ]
    })
      .then(function (dbUser) {
        res.json(dbUser);
        // res.sendFile("", dbUser);
      })
      .catch()
      .then(function (err) {
        res.status(500).send(err);
      });
  });

  app.get('/api/users/:id', function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  app.post('/api/users', function (req, res) {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    // get the user password
    // create the salt
    // hash the password
    // save the user
    db.User.create(req.body)
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  app.delete('/api/users/:id', function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch()
      .then(function (err) {
        res.status(500).send(err);
      });
  });
};
