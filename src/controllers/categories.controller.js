const express = require("express");
const router = express.Router();
const categoriesService = require("../services/categories.service");

// routes
router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function getAll(req, res, next) {
	categoriesService
		.getAll(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function create(req, res, next) {
	categoriesService
		.getAll()
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function getById(req, res, next) {
	categoriesService
		.getById()
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function update(req, res, next) {
	categoriesService
		.update()
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function _delete(req, res, next) {
	categoriesService
		.delete()
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
