
var db = require("../models");

module.exports = function (app) {
  // Load index page
<<<<<<< HEAD
  app.get("/api/fitness", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
=======
  app.get("/", function (req, res) {
    res.render("index");
   
>>>>>>> 9a9e51019c273bdbec396f86323033f554ff5153
    });
  

  // Load example page and pass in an example by id
<<<<<<< HEAD
  app.get("/api/fitness/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
=======
  app.get("/calcCal", function (req, res) {
    res.render("calcCal");
   
>>>>>>> 9a9e51019c273bdbec396f86323033f554ff5153
    });
  

    app.get("/graph", function (req, res) {
      res.render("graph");
     
      });

      app.get("/manburnt", function (req, res) {
        res.render("manburnt");
       
        });
      
    
        app.get("/dietary", function (req, res) {
          res.render("dietary");
         
          });  

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });

  // cms route loads cms.html
  // app.get('/cms', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../public/cms.html'));
  // });

  // // blog route loads blog.html
  // app.get('/blog', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../public/blog.html'));
  // });

  // // authors route loads author-manager.html
  // app.get('/authors', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../public/author-manager.html'));
  // });
};
