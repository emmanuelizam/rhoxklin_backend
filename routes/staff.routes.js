const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/staff.controller");

module.exports = (ProtectedRouter) => {
  ProtectedRouter.get("/staff", findAll);
  ProtectedRouter.get("/staff/:id", findOne);
  ProtectedRouter.post("/staff", create);
  ProtectedRouter.delete("/staff/:id", remove);
  ProtectedRouter.delete("/staff", removeAll);
  ProtectedRouter.put("/staff", update);

  return ProtectedRouter;
};
