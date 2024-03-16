const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/testimonial.controller");

module.exports = (Router, ProtectedRouter) => {
  Router.get("/testimonial", findAll);
  Router.get("/testimonial/:id", findOne);
  ProtectedRouter.get("/testimonial", findAll);
  ProtectedRouter.get("/testimonial/:id", findOne);
  ProtectedRouter.post("/testimonial", create);
  ProtectedRouter.delete("/testimonial/:id", remove);
  ProtectedRouter.delete("/testimonial", removeAll);
  ProtectedRouter.put("/testimonial", update);

  return [Router, ProtectedRouter];
};
