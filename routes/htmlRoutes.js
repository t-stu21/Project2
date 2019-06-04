var db = require('../models');

var path = require('path');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    res.render('index');
  });

  // Load example page and pass in an example by id
  app.get('/calcCal', function(req, res) {
    res.render('calcCal');
  });

  app.get('/graph', function(req, res) {
    res.render('graph');
  });

  app.get('/manburnt', function(req, res) {
    res.render('manburnt');
  });

  app.get('/dietary', function(req, res) {
    res.render('dietary');
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
    res.sendFile(path.join(__dirname, '../public/adduser.html'));
  });
};
