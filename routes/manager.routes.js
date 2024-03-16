const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/manager.controller");

module.exports = (ProtectedRouter) => {
  ProtectedRouter.get("/manager", findAll);
  ProtectedRouter.get("/manager/:id", findOne);
  ProtectedRouter.post("/manager", create);
  ProtectedRouter.delete("/manager/:id", remove);
  ProtectedRouter.delete("/manager", removeAll);
  ProtectedRouter.put("/manager", update);

  return ProtectedRouter;
};
