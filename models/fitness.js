module.exports = function (sequelize, DataTypes) {
  var Fitness = sequelize.define("Fitness", {
    cal_goals: DataTypes.INTEGER,
    cal_burned: DataTypes.INTEGER,
    cal_intake: DataTypes.INTEGER,
    user_height: DataTypes.INTEGER,
    user_weight: DataTypes.INTEGER,
    user_age: DataTypes.INTEGER,
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

