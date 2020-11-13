'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exposure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      exposure.belongsTo(models.child, {foreignKey: "id"});
      exposure.belongsTo(models.food, {foreignKey: "id"});
    }
  };
  exposure.init({
    user_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    child_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    reaction: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'exposure',
  });
  return exposure;
};