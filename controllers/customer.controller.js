const { Op, Sequelize } = require("sequelize");
const db = require("../models/index.js");
const BaseController = require("./base.js");
const Customer = db.Customer;

const validateCreateRequestBody = (req, res) => {
  // try {
  //   if (!req.body.content) {
  //     res.status(400).send({
  //       message: "content cannot be empty!",
  //     });
  //     return false;
  //   } else if (req.body.senderIsCustomer === null) {
  //     res.status(400).send({
  //       message: "'sender is customer' cannot be null!",
  //     });
  //     return false;
  //   } else if (!req.body.dateSend) {
  //     res.status(400).send({
  //       message: "date send cannot be empty!",
  //     });
  //     return false;
  //   }
  return true;
  // } catch (error) {
  //   res.status(400).send({ message: "some error occured" });
  // }
};

const filterFindAll = (req, res) => {
  const name = req.body.name;
  const attributes = [
    "id",
    "name",
    "birthday",
    "sex",
    "phoneNumber",
    "email",
    "createdAt",
    "updatedAt",
    // [
    //   Sequelize.literal(
    //     `(select name as staff from Staffs s where s.id = StaffId)`
    //   ),
    //   "staff_name",
    // ],
    // [
    //   Sequelize.literal(
    //     `(select name as customer from Customers c where c.id = CustomerId)`
    //   ),
    //   "customer_name",
    // ],
  ]; // list of database table attributes
  const include = [
    //{ model: Staff, attributes: ["id"] }
  ]; // list of tables to be used for join
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null; // condition for where
  return [attributes, include, condition];
};

class CustomerController extends BaseController {
  constructor() {
    super(Customer, {
      validateCreateRequestBody: validateCreateRequestBody,
      filterFindAll: filterFindAll,
    });
  }
}

module.exports = new CustomerController();
