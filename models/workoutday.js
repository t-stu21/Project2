'use strict';
module.exports = (sequelize, DataTypes) => {
  var WorkoutDay = sequelize.define('WorkoutDay', {
    caloriesin: {
      type: DataTypes.INTEGER
      // allowNull: false
      // validate: {
      //   len: [1]
      // }
    },
    caloriesout: {
      type: DataTypes.INTEGER
      // allowNull: false
      // len: [1]
    },
    date: {
      type: DataTypes.INTEGER
      //allowNull: false
    },
    workout: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER
    }
  });

  WorkoutDay.associate = models => {
    // A WorkoutDay should belong to an User
    // A WorkoutDay can't be created without a User due to the foreign key constraint
    WorkoutDay.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WorkoutDay;
};
