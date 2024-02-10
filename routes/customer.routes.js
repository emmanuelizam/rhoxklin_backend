const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customer.controller");

module.exports = (Router) => {
  Router.get("/customer", findAll);
  Router.get("/customer/:id", findOne);
  Router.post("/customer", create);
  Router.delete("/customer/:id", remove);
  Router.delete("/customer", removeAll);
  Router.put("/customer", update);

  return Router;
};
