const express = require("express");
const router = express.Router();
const working_days = require("../services/working_days.service");

// routes
router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
  working_days
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(200).json(err);
    });
}

function getAll(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "GET Method is not allowed",
  });
}
function getById(req, res, next) {
  working_days
    .getById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function update(req, res, next) {
  working_days
    .update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function _delete(req, res, next) {
  working_days
    .delete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}
