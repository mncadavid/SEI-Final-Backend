'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grocerylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      grocerylist.belongsTo(models.users, {foreignKey: "id"});
      grocerylist.belongsToMany(models.food, {
        through: "grocerylistsfood",
        foreignKey: "list_id",
        otherKey: "food_id"
      });
    }
  };
  grocerylist.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'grocerylist',
  });
  return grocerylist;
};