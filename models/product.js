'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      detail: DataTypes.TEXT,
      votes: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      photos: DataTypes.ARRAY(DataTypes.STRING),
      variants: DataTypes.ARRAY(DataTypes.JSON),
      UserId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
