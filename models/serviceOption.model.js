"use strict";

module.exports = (sequelize, DataTypes, Service) => {
  const ServiceOption = sequelize.define("ServiceOption", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: Service,
        key: "id",
      },
      onDelete: "CASCADE",
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

  Service.hasMany(ServiceOption);
  ServiceOption.belongsTo(Service);

  return ServiceOption;
};
