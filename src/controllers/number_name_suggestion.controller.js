const express = require("express");
const router = express.Router();
const number_name_suggestion = require("../services/number_name_suggestion.service");
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
// routes
router.post("/", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
  number_name_suggestion
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(200).json(err);
    });
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    mobile_number: Joi.number().required(),
    country_iso2: Joi.string().required(),
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
function getAll(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "GET Method is not allowed",
  });
}
function getById(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "GET Method is not allowed",
  });
}

function update(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "PUT Method is not allowed",
  });
}

function _delete(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "DELETE Method is not allowed",
  });
}
