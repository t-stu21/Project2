var db = require("../models");

module.exports = function (app) {
  // Get all
  app.get("/api/fitness", function (req, res) {
    db.Fitness.findAll({}).then(function (results) {
      res.json(results);
    }).catch().then(function (err) {
      res.status(500).send(err);
    });
  });

  app.put("/api/fitness", function (req, res) {
    console.log(req.body);
    db.Fitness.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbUpdate) {
      res.json(dbUpdate);
    }).catch().then(function (err) {
      res.status(500).send(err);
    });
  });

  // Delete
  app.delete("/api/fitness/:id", function (req, res) {
    db.Fitness.destroy({
      where: { id: req.params.id }
    }).then(function (dbDelete) {
      res.json(dbDelete);
    }).catch().then(function (err) {
      res.status(500).send(err);
    });
  });

  //Add exercise

  app.post("/api/fitness/exercise", function (req, res) {
    db.Fitness.create({
      cal_burned: req.body.cal_burned,
    }).then(function (dbBurned) {
      res.json(dbBurned);
    }).catch().then(function (err) {
      res.status(500).send(err);
    });
  });

  //Add Food

  app.post("/api/fitness/food", function (req, res) {
    db.Fitness.create({
      cal_intake: req.body.cal_intake,
    }).then(function (dbIntake) {
      res.json(dbIntake);
    }).catch().then(function (err) {
      res.status(500).send(err);
    });
  });

  //Update

};
