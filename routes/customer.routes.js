const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/customer.controller");

module.exports = (ProtectedRouter) => {
  ProtectedRouter.get("/customer", findAll);
  ProtectedRouter.get("/customer/:id", findOne);
  ProtectedRouter.post("/customer", create);
  ProtectedRouter.delete("/customer/:id", remove);
  ProtectedRouter.delete("/customer", removeAll);
  ProtectedRouter.put("/customer", update);

  return ProtectedRouter;
};
