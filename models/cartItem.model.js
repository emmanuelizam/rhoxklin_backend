"use strict";

module.exports = (sequelize, DataTypes, Product, Customer) => {
  const CartItem = sequelize.define("CartItems", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      unique: false,
      validate: { isDecimal: true },
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: { isDate: true },
    },
  });

  Product.belongsToMany(Customer, { through: CartItem });
  Customer.belongsToMany(Product, { through: CartItem });
  CartItem.belongsTo(Product);
  CartItem.belongsTo(Customer);
  Product.hasMany(CartItem);
  Customer.hasMany(CartItem);

  return CartItem;
};
