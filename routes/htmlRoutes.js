var path = require("path");
var authController = require("../controllers/authcontroller.js");
var db = require("../models");

var schedule = require("./schedule");

module.exports = function (app) {
  // Load index page
<<<<<<< HEAD
  app.get("/", function(req, res) {
    res.render("index", { schedule });
  });

  app.get("/calcCal", function(req, res) {
    res.render("calcCal", { schedule });
  });

  app.get("/graph", function(req, res) {
    res.render("graph", { schedule });
  });

  app.get("/manburnt", function(req, res) {
    res.render("manburnt", { schedule });
  });

  app.get("/userinfo", function(req, res) {
    res.render("userinfo");
  });

  app.get("/exercise", function(req, res) {
    res.render("exercise", { schedule });
  });

  app.get("/addworkout", function(req, res) {
    res.render("addworkoutday");
  });

  app.get("/workoutday", function(req, res) {
    res.render("workoutday");
  });

  app.get("/users", function(req, res) {
    res.render("user-manager");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
=======
  app.get('/', function (req, res) {
    res.render('index', { schedule });
  });

  app.get('/calcCal', function (req, res) {
    res.render('calcCal', { schedule });
  });

  app.get('/graph', function (req, res) {
    res.render('graph', { schedule });
  });

  app.get('/manburnt', function (req, res) {
    res.render('manburnt', { schedule });
  });

  app.get('/userinfo', function (req, res) {
    res.render('userinfo');
  });

  app.get('/exercise', function (req, res) {
    res.render('exercise', { schedule });
  });

  app.get('/addworkout', function (req, res) {
    res.render('addworkoutday');
  });

  app.get('/workoutday', function (req, res) {
    res.render('workoutday');
  });

  app.get('/users', function (req, res) {
    res.render('user-manager');
  });

>>>>>>> 97c69c0963420d625768ef70d72f5f3e7aa91997
};
