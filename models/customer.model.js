"use strict";

module.exports = (sequelize, DataTypes, bcrypt) => {
  const Customer = sequelize.define("Customers", {
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
      unique: false,
      validate: {
        min: { args: 3, msg: "name must be at least 3 characters long" },
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: { isDate: true },
    },
    sex: {
      type: DataTypes.ENUM,
      values: ["Male", "Female"],
      allowNull: false,
      unique: false,
      validate: { isAlpha: true },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: { isNumeric: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        is: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z\d/?!;'":,.<>\]\[}{!@#$%^&*()-=_+`~\\]{8,}$/,
      },
    },
  });

  Customer.beforeCreate((customer) => {
    const hashedPassword = bcrypt.hashSync(
      customer.password,
      bcrypt.genSaltSync(5)
    );
    customer.password = hashedPassword;
  });

  return Customer;
};
