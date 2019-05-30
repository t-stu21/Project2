'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING,
    password: DataTypes.STRING,

    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    goal_weight: DataTypes.INTEGER
  });

  User.associate = models => {
    // Associating User with WorkoutDays
    // When an User is deleted, also delete any associated WorkoutDays
    User.hasMany(models.WorkoutDay, {
      onDelete: 'cascade'
    });
  };

  return User;
};
