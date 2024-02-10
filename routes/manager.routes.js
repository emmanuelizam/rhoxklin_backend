const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/manager.controller");

module.exports = (Router) => {
  Router.get("/manager", findAll);
  Router.get("/manager/:id", findOne);
  Router.post("/manager", create);
  Router.delete("/manager/:id", remove);
  Router.delete("/manager", removeAll);
  Router.put("/manager", update);

  return Router;
};
