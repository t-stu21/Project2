var db = require('../models');

module.exports = function(app) {
  app.get('/api/users', function(req, res) {
    db.User.findAll({
      include: [
        db.WorkoutDay
        // include: [
        //   {
        //     model: db.comments
        //   }
        // ]
      ]
    })
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/api/users/:id', function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  app.post('/api/users', function(req, res) {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });

  app.delete('/api/users/:id', function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch()
      .then(function(err) {
        res.status(500).send(err);
      });
  });
};