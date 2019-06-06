// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the workoutdays
  app.get("/api/workoutdays", function(req, res) {
    var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }
    // 1. Add a join here to include all of the Users to these workoutdays
    db.WorkoutDay.findAll({
      where: query
    })
      .then(function(dbWorkoutDay) {
        res.json(dbWorkoutDay);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  // Get route for retrieving a single workoutday
  app.get("/api/workoutdays/:id", function(req, res) {
    // 2. Add a join here to include the User who wrote the WorkoutDay
    db.WorkoutDay.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbWorkoutDay) {
        console.log(dbWorkoutDay);
        res.json(dbWorkoutDay);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  // POST route for saving a new workoutday
  app.post("/api/workoutdays", function(req, res) {
    db.WorkoutDay.create(req.body)
      .then(function(dbWorkoutDay) {
        res.json(dbWorkoutDay);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  // DELETE route for deleting workoutdays
  app.delete("/api/workoutdays/:id", function(req, res) {
    db.WorkoutDay.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbWorkoutDay) {
        res.json(dbWorkoutDay);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  // PUT route for updating workoutdays
  app.put("/api/workoutdays", function(req, res) {
    db.WorkoutDay.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbWorkoutDay) {
        res.json(dbWorkoutDay);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });
};
