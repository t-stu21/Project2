var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
   
    });
  

  // Load example page and pass in an example by id
  app.get("/calcCal", function (req, res) {
    res.render("calcCal");
   
    });
  

    app.get("/graph", function (req, res) {
      res.render("graph");
     
      });

      app.get("/manburnt", function (req, res) {
        res.render("manburnt");
       
        });
      
    

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
