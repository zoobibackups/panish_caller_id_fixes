const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const user_social_link = require("../services/user_social_link.service");

// routes
router.post("/", createSchema, create);
router.get("/:id", getById);
router.put("/:id", createSchema, update);
router.delete("/:id", _delete);
module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    link: Joi.string().required(),
    type: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  user_social_link
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function getById(req, res, next) {
  user_social_link
    .getById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function update(req, res, next) {
  user_social_link
    .update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function _delete(req, res, next) {
  user_social_link
    .delete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}
