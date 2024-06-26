"use strict";

module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define("Testimonials", {
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
    content: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT("medium"),
    },
  });

  return Testimonial;
};
