const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/staffCustomerMessage.controller");

module.exports = (Router, ProtectedRouter) => {
  ProtectedRouter.get("/staffcustomermessage", findAll);
  ProtectedRouter.get("/staffcustomermessage/:id", findOne);
  Router.post("/staffcustomermessage", create);
  ProtectedRouter.post("/staffcustomermessage", create);
  ProtectedRouter.delete("/staffcustomermessage/:id", remove);
  ProtectedRouter.delete("/staffcustomermessage", removeAll);
  ProtectedRouter.put("/staffcustomermessage", update);

  return [Router, ProtectedRouter];
};
