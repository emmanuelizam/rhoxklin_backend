const {
  findOne,
  findAll,
  update,
  removeAll,
  create,
  remove,
} = require("../controllers/testimonial.controller");

module.exports = (Router) => {
  Router.get("/testimonial", findAll);
  Router.get("/testimonial/:id", findOne);
  Router.post("/testimonial", create);
  Router.delete("/testimonial/:id", remove);
  Router.delete("/testimonial", removeAll);
  Router.put("/testimonial", update);

  return Router;
};
