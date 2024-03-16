const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/serviceOption.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/serviceoption", findAll);
  Router.get("/serviceoption/:id", findOne);
  ProtectedRouter.get("/serviceoption", findAll);
  ProtectedRouter.get("/serviceoption/:id", findOne);
  ProtectedRouter.post("/serviceoption", create);
  ProtectedRouter.delete("/serviceoption/:id", remove);
  ProtectedRouter.delete("/serviceoption", removeAll);
  ProtectedRouter.put("/serviceoption", update);

  return [Router, ProtectedRouter];
};
