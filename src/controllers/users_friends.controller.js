const express = require("express");
const router = express.Router();
const user_friends = require("../services/user_friends.service");

// routes
router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
  user_friends
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
  user_friends
    .getById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json(err);
    });
}

function update(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "UPDATE Method is not allowed",
  });
}

function _delete(req, res, next) {
  res.status(405).json({
    status: false,
    errorMessage: "DELETE Method is not allowed",
  });
}
