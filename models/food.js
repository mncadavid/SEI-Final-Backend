'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      food.hasMany(models.exposure, {foreignKey: "id"});
      food.belongsToMany(models.grocerylist, {
        through: "grocerylistsfood",
        foreignKey: "food_id",
        otherKey: "list_id"
      });
    }
  };
  food.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};