var db = require('../models');

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

  // cms route loads cms.html
  app.get('/cms', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/cms.html'));
  });

  // blog route loads blog.html
  app.get('/blog', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/blog.html'));
  });

  // authors route loads author-manager.html
  app.get('/authors', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/author-manager.html'));
  });
};
