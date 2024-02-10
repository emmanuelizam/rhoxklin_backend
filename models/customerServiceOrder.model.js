"use strict";

module.exports = (sequelize, DataTypes, Service, Customer) => {
  const CustomerServiceOrder = sequelize.define("CustomerServiceOrders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service,
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
      validate: { isDecimal: { args: true, msg: "quantity must be a number" } },
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

  Service.belongsToMany(Customer, { through: CustomerServiceOrder });
  Customer.belongsToMany(Service, { through: CustomerServiceOrder });
  CustomerServiceOrder.belongsTo(Service);
  CustomerServiceOrder.belongsTo(Customer);
  Service.hasMany(CustomerServiceOrder);
  Customer.hasMany(CustomerServiceOrder);

  return CustomerServiceOrder;
};
