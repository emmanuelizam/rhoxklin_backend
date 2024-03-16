const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customerServiceOrder.controller");

module.exports = (ProtectedRouter) => {
  ProtectedRouter.get("/customerserviceorder", findAll);
  ProtectedRouter.get("/customerserviceorder/:id", findOne);
  ProtectedRouter.post("/customerserviceorder", create);
  ProtectedRouter.delete("/customerserviceorder/:id", remove);
  ProtectedRouter.delete("/customerserviceorder", removeAll);
  ProtectedRouter.put("/customerserviceorder", update);

  return ProtectedRouter;
};
