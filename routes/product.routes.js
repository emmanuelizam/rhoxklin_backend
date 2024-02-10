const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/product.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/product", findAll);
  Router.get("/product/:id", findOne);
  ProtectedRouter.get("/product", findAll);
  ProtectedRouter.get("/product/:id", findOne);
  ProtectedRouter.post("/product", create);
  ProtectedRouter.delete("/product/:id", remove);
  ProtectedRouter.delete("/product", removeAll);
  ProtectedRouter.put("/product", update);

  return [Router, ProtectedRouter];
};
