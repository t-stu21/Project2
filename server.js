<<<<<<< HEAD
var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

var db = require('./models');

=======
require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');

var db = require('./models');
>>>>>>> a3bc10b0c45d2d180ae3035cf16de0b43714fa34

var PORT = process.env.PORT || 3000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For Passport
//session secret
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
//persistant login sessions
app.use(passport.session());



// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
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

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
<<<<<<< HEAD
  });

  // Passport
  app.get('/', function (req, res) {
    res.send('Welcome to Passport with Sequelize');
=======
>>>>>>> a3bc10b0c45d2d180ae3035cf16de0b43714fa34
  });
});

module.exports = app;