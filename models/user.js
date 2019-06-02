'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 18, max: 100 }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 80, max: 600 }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goal_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 80, max: 600 }
    }
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
