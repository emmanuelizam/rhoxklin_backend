"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Products", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: false,
      validate: { isFloat: true },
    },
  });

  return Product;
};
