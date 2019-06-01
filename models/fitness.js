'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fitness = sequelize.define('Fitness', {
    cal_goals: DataTypes.INTEGER,
    cal_autoburnt: DataTypes.INTEGER,
    cal_manburnt: DataTypes.INTEGER,
    cal_intake: DataTypes.INTEGER,
    user_height: DataTypes.INTEGER,
    user_weight: DataTypes.INTEGER,
    user_age: DataTypes.INTEGER
  });
  Fitness.associate = function (models) {
    Fitness.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Fitness;
};
