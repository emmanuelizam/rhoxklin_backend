const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/service.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/service", findAll);
  Router.get("/service/:id", findOne);
  ProtectedRouter.get("/service", findAll);
  ProtectedRouter.get("/service/:id", findOne);
  ProtectedRouter.post("/service", create);
  ProtectedRouter.delete("/service/:id", remove);
  ProtectedRouter.delete("/service", removeAll);
  ProtectedRouter.put("/service", update);

  return [Router, ProtectedRouter];
};
