const express = require("express");
const router = express.Router();
const filtered_contacts = require("../services/filtered_contacts.service");

// routes
router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
  filtered_contacts
    .create()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function getAll(req, res, next) {
  filtered_contacts
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}
function getById(req, res, next) {
  filtered_contacts
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function update(req, res, next) {
  filtered_contacts
    .update()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function _delete(req, res, next) {
  filtered_contacts
    .delete()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}
