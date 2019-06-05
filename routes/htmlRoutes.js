var path = require('path');
var authController = require('../controllers/authcontroller.js');
var db = require('../models');

var schedule = require('./schedule');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    res.render('index', { schedule });
  });

  // Load example page and pass in an example by id
  app.get('/calcCal', function(req, res) {
    res.render('calcCal', { schedule });
  });

  app.get('/graph', function(req, res) {
    res.render('graph', { schedule });
  });

  app.get('/manburnt', function(req, res) {
    res.render('manburnt', { schedule });
  });

  app.get('/userinfo', function(req, res) {
    res.render('userinfo');
  });

  app.get('/exercise', function(req, res) {
    res.render('exercise', { schedule });
  });

  // addworkout route loads addworkout.html
  app.get('/addworkout', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/addworkoutday.html'));
  });

  // workoutday route loads workoutday.html
  app.get('/workoutday', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/workoutday.html'));
  });

  // users route loads user-manager.html
  app.get('/users', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/user-manager.html'));
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
    // res.sendFile(path.join(__dirname, '../public/adduser.html'));
  });
};
