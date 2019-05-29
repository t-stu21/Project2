module.exports = function (sequelize, DataTypes) {
  var Fitness = sequelize.define("Fitness", {
    cal_goals: Sequelize.INTEGER,
    cal_burned: Sequelize.INTEGER,
    cal_intake: Sequelize.INTEGER,
    user_height: Sequelize.INTEGER,
    user_weight: Sequelize.INTEGER,
    user_age: Sequelize.INTEGER,
  });
  Fitness.associate = function (models) {
    Fitness.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Fitness;
};

