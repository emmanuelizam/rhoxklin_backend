const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customerServiceOrder.controller");

module.exports = (Router) => {
  Router.get("/customerserviceorder", findAll);
  Router.get("/customerserviceorder/:id", findOne);
  Router.post("/customerserviceorder", create);
  Router.delete("/customerserviceorder/:id", remove);
  Router.delete("/customerserviceorder", removeAll);
  Router.put("/customerserviceorder", update);

  return Router;
};
