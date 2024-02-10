"use strict";

module.exports = (sequelize, DataTypes, bcrypt) => {
  const Staff = sequelize.define("Staffs", {
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isNumeric: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { args: true, msg: "invalid email" } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        is: {
          args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z\d/?!;'":,.<>\]\[}{!@#$%^&*()-=_+`~\\]{8,}$/,
          msg: "password must contain an upper case, lower case, number and a symbol",
        },
      },
    },
  });

  Staff.beforeCreate((staff) => {
    const hashedPassword = bcrypt.hashSync(
      staff.password,
      bcrypt.genSaltSync(5)
    );
    staff.password = hashedPassword;
  });

  return Staff;
};
