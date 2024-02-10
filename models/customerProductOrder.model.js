"use strict";

module.exports = (sequelize, DataTypes, Product, Customer) => {
  const CustomerProductOrder = sequelize.define("CustomerProductOrders", {
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
      validate: {
        isDate: {
          args: true,
          msg: "this must be a date like '2024-01-22 20:18:19.123'",
        },
      },
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: {
        isDate: {
          args: true,
          msg: "this must be a date like '2024-01-22 20:18:19.123'",
        },
      },
    },
    dateModified: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "this must be a date like '2024-01-22 20:18:19.123'",
        },
      },
    },
    dateProcessed: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "this must be a date like '2024-01-22 20:18:19.123'",
        },
      },
    },
    processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      unique: false,
    },
  });

  Product.belongsToMany(Customer, { through: CustomerProductOrder });
  Customer.belongsToMany(Product, { through: CustomerProductOrder });
  CustomerProductOrder.belongsTo(Product);
  CustomerProductOrder.belongsTo(Customer);
  Product.hasMany(CustomerProductOrder);
  Customer.hasMany(CustomerProductOrder);

  return CustomerProductOrder;
};
