"use strict";

module.exports = (sequelize, DataTypes, Staff, Customer) => {
  const StaffCustomerFirstMessage = sequelize.define(
    "StaffCustomerFirstMessages",
    {
      lastMessageId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
      },
      StaffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Staff,
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateSend: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
        validate: { isDate: true },
      },
      dateReceived: {
        type: DataTypes.DATE,
        validate: { isDate: true },
      },
      dateRead: {
        type: DataTypes.DATE,
        validate: { isDate: true },
      },
    }
  );

  Staff.belongsToMany(Customer, { through: StaffCustomerFirstMessage });
  Customer.belongsToMany(Staff, { through: StaffCustomerFirstMessage });
  StaffCustomerFirstMessage.belongsTo(Staff);
  StaffCustomerFirstMessage.belongsTo(Customer);
  Staff.hasMany(StaffCustomerFirstMessage);
  Customer.hasMany(StaffCustomerFirstMessage);

  return StaffCustomerFirstMessage;
};
