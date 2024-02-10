const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customerProductOrder.controller");

module.exports = (Router) => {
  Router.get("/customerproductorder", findAll);
  Router.get("/customerproductorder/:id", findOne);
  Router.post("/customerproductorder", create);
  Router.delete("/customerproductorder/:id", remove);
  Router.delete("/customerproductorder", removeAll);
  Router.put("/customerproductorder", update);

  return Router;
};
