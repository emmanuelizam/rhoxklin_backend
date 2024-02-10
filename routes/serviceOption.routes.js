const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/serviceOption.controller");

module.exports = (Router) => {
  Router.get("/serviceoption", findAll);
  Router.get("/serviceoption/:id", findOne);
  Router.post("/serviceoption", create);
  Router.delete("/serviceoption/:id", remove);
  Router.delete("/serviceoption", removeAll);
  Router.put("/serviceoption", update);

  return Router;
};
