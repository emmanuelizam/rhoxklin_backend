const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customerProductOrder.controller");

module.exports = (ProtectedRouter) => {
  ProtectedRouter.get("/customerproductorder", findAll);
  ProtectedRouter.get("/customerproductorder/:id", findOne);
  ProtectedRouter.post("/customerproductorder", create);
  ProtectedRouter.delete("/customerproductorder/:id", remove);
  ProtectedRouter.delete("/customerproductorder", removeAll);
  ProtectedRouter.put("/customerproductorder", update);

  return ProtectedRouter;
};
