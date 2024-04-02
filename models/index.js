const { Sequelize, DataTypes } = require("sequelize");
const { rhoxklin_database } = require("../config/db.config.js");

const sequelize = new Sequelize(
  rhoxklin_database.database,
  rhoxklin_database.username,
  rhoxklin_database.password,
  {
    host: rhoxklin_database.host,
    dialect: rhoxklin_database.dialect,
    pool: rhoxklin_database.pool,
  }
);

const conn = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to mysql database");
  } catch (error) {
    console.log(error);
  }
};

const bcrypt = require("bcryptjs");

const ContactUs = require("./contactUs.model.js")(sequelize, DataTypes);
const Customer = require("./customer.model.js")(sequelize, DataTypes, bcrypt);
const Staff = require("./staff.model.js")(sequelize, DataTypes, bcrypt);
const Product = require("./product.model.js")(sequelize, DataTypes);
const Service = require("./service.model.js")(sequelize, DataTypes);
const Manager = require("./manager.model.js")(sequelize, DataTypes, bcrypt);
const Testimonial = require("./testimonial.model.js")(sequelize, DataTypes);
const ServiceOption = require("./serviceOption.model.js")(
  sequelize,
  DataTypes,
  Service
);
const CartItem = require("./cartItem.model.js")(
  sequelize,
  DataTypes,
  Product,
  Customer
);
const CustomerProductOrder = require("./customerProductOrder.model.js")(
  sequelize,
  DataTypes,
  Product,
  Customer
);
const CustomerServiceOrder = require("./customerServiceOrder.model.js")(
  sequelize,
  DataTypes,
  Service,
  Customer
);
const StaffCustomerFirstMessage = require("./staffCustomerFirstMessage.js")(
  sequelize,
  DataTypes,
  Staff,
  Customer
);
const StaffCustomerMessage = require("./staffCustomerMessage.model.js")(
  sequelize,
  DataTypes,
  Staff,
  Customer,
  StaffCustomerFirstMessage
);

sequelize
  .sync({
    alter: true,
    //force: true,
    //logging: true,
    match: /^rhoxklin.*/,
  })
  .then((value) => {
    console.log("dababase was synced successfully!");
  })
  .catch((error) => {
    console.log("failed to sync db: " + error.message);
  });

const db = {
  ContactUs,
  Customer,
  Staff,
  Product,
  Service,
  Manager,
  Testimonial,
  CartItem,
  CustomerProductOrder,
  CustomerServiceOrder,
  StaffCustomerMessage,
  ServiceOption,
};

module.exports = db;
