const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/contactUs.controller");

module.exports = (Router) => {
  Router.get("/contactus", findAll);
  Router.get("/contactus/:id", findOne);
  Router.post("/contactus", create);
  Router.delete("/contactus/:id", remove);
  Router.delete("/contactus", removeAll);
  Router.put("/contactus", update);

  return Router;
};
