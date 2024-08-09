const express = require("express");
const router = express.Router();
const countiresService = require("../services/countires.service");

// routes
router.post("/", register);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function register(req, res, next) {
	countiresService
		.create(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function getAll(req, res, next) {
	countiresService
		.getAll(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
function getById(req, res, next) {
	countiresService
		.getByIso2(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function update(req, res, next) {
	countiresService
		.update(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function _delete(req, res, next) {
	countiresService
		.delete(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
