var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var user = require('./models/user.js');
var pport = require('./config/passport/passport.js');
//auth routes for passport
var authRoute = require('./routes/auth.js')(app, passport);

//models
var models = require('./models');

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

var db = require('./models');

var PORT = process.env.PORT || 3000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For Passport
//session secret
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
//persistant login sessions
app.use(passport.session());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.set('views', './views');
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/user-api-routes')(app);
require('./routes/workoutday-api-routes')(app);
require('./routes/htmlRoutes')(app);
// Render 404 page for any unmatched routes
app.get('*', function (req, res) {
  res.render('404');
});

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

var calorieShit = {
  "id": 2,
  "name": "Trev",
  "email": "trev@gmail.com",
  "password": "$2a$10$NU4o2/d.IgvolMH0gfyWaec3xL9xVnP9Wd0ugLFbz9fXFGASrjd52",
  "last_login": null,
  "status": "active",
  "age": 26,
  "gender": "Male",
  "weight": 180,
  "height": 77,
  "goal_weight": 190,
  "daily_cals": 2339,
  "createdAt": "2019-06-06T04:33:22.000Z",
  "updatedAt": "2019-06-06T04:33:22.000Z"
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync().then(function () {
  console.log('Nice! Database looks fine');

  app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });

  // Passport
  app.get('/', function (req, res) {
    res.send('Welcome to Passport with Sequelize');
  });
});

module.exports = app;
