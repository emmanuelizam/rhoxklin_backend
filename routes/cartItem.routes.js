const {
  findOne,
  findAll,
  update,
  create,
  remove,
  removeAll,
} = require("../controllers/cartItem.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/cartitem", findAll);
  Router.get("/cartitem/:id", findOne);
  Router.post("/cartitem", create);
  Router.delete("/cartitem/:id", remove);
  Router.delete("/cartitem", removeAll);
  Router.put("/cartitem", update);
  ProtectedRouter.get("/cartitem", findAll);
  ProtectedRouter.get("/cartitem/:id", findOne);
  ProtectedRouter.post("/cartitem", create);
  ProtectedRouter.delete("/cartitem/:id", remove);
  ProtectedRouter.delete("/cartitem", removeAll);
  ProtectedRouter.put("/cartitem", update);

  return [Router, ProtectedRouter];
};
