var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
// var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var user = require('./models/user.js');
var pport = require('./config/passport/passport.js');

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// }

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
//auth routes for passport
require('./routes/auth.js')(app, passport);
// Render 404 page for any unmatched routes
app.get('*', function(req, res) {
  res.render('404');
});

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

  app.listen(PORT, function() {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });

  // Passport
  app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
  });
});

module.exports = app;
