'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exercise = sequelize.define('Exercise', {
    workout: {
      type: DataTypes.STRING
    },
    kcal: {
      type: DataTypes.INTEGER
    }
  });
  return Exercise;
};
