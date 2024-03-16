const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/contactUs.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/contactus", findAll);
  Router.get("/contactus/:id", findOne);
  ProtectedRouter.get("/contactus", findAll);
  ProtectedRouter.get("/contactus/:id", findOne);
  ProtectedRouter.post("/contactus", create);
  ProtectedRouter.delete("/contactus/:id", remove);
  ProtectedRouter.delete("/contactus", removeAll);
  ProtectedRouter.put("/contactus", update);

  return [Router, ProtectedRouter];
};
