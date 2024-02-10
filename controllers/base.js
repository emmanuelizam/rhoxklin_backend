const { where } = require("sequelize");

class BaseController {
  constructor(model, options = {}) {
    this.model = model;
    this.validateCreateRequestBody = options.validateCreateRequestBody;
    options.filterFindAll
      ? (this.filterFindAll = options.filterFindAll)
      : (this.filterFindAll = null);
  }

  create = (req, res) => {
    // validate request
    const isValid =
      this.validateCreateRequestBody &&
      this.validateCreateRequestBody(req, res);
    // save modelEntry to the database
    isValid &&
      this.model
        .build(req.body)
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              `some error occurred while saving the ${this.model.name}`,
          });
        });
  };

  //retrieve all modelEntrys from the database
  findAll = (req, res) => {
    let [attributes, include, condition] = this.filterFindAll(req, res);
    attributes.length === 0 ? (attributes = null) : attributes;
    include.length === 0 ? (include = null) : include;

    // retrieve from database
    this.model
      .findAll({
        attributes: attributes,
        include: include,
        where: condition,
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `error retrieving ${this.model.name} from database`,
        });
      });
  };

  //retrieve one tutorial from the database with an id
  findOne = (req, res) => {
    const id = req.params.id;

    // retrieve from database
    this.model
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res
            .status(404)
            .send({ message: `cannot find ${this.model.name} with id=${id}` });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `error retrieving ${this.model.name} with id=${id}`,
        });
      });
  };

  // update a modelEntry using it's id
  update = (req, res) => {
    if (req.isAuthenticated) {
      const id = req.params.id;
      this.model
        .update(req.body, { where: { id: id } })
        .then((num) => {
          if (num === 1) {
            res.send({
              message: `successfully updated ${this.model.name} with id=${id}`,
            });
          } else {
            res.send({
              message: `cannot update ${this.model.name} with id=${id} maybe because it was not found or req.body was empty`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              `could not update ${this.model.name} with id=${id}`,
          });
        });
    } else {
      res.status(400).json({ message: "unauthorised" });
    }
  };

  //delete a modelEntry with specified id
  remove = (req, res) => {
    if (req.isAuthenticated) {
      const id = req.params.id;

      this.model
        .destroy({ where: { id: id } })
        .then((num) => {
          if (num === 1) {
            res.send({
              message: `successfully deleted ${this.model.name} with id=${id}`,
            });
          } else {
            res.send({
              message: `could not delete ${this.model.name} with id=${id} probably because it was not found`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `error deleting turorial with id=${id}`,
          });
        });
    } else {
      res.status(400).json({ message: "unauthorised" });
    }
  };

  removeAll = (req, res) => {
    if (req.isAuthenticated) {
      this.model
        .destroy({ where: {}, truncate: false })
        .then((num) => {
          res.send({
            message: `${num} ${this.model.name}s were deleted from the database`,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "an error occurred while deleting ${this.model.name}s",
          });
        });
    } else {
      res.status(400).json({ message: "unauthorised" });
    }
  };
}

module.exports = BaseController;
