const {
  findOne,
  findAll,
  update,
  create,
  remove,
  removeAll,
} = require("../controllers/cartItem.controller");

module.exports = (Router) => {
  Router.get("/cartitem", findAll);
  Router.get("/cartitem/:id", findOne);
  Router.post("/cartitem", create);
  Router.delete("/cartitem/:id", remove);
  Router.delete("/cartitem", removeAll);
  Router.put("/cartitem", update);

  return Router;
};
