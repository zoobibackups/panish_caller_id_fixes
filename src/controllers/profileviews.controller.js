const express = require("express");
const router = express.Router();
const profileviews = require("../services/profileviews.service");
const Joi = require("joi");
const validateRequest = require("../_middleware/validateRequest");
// routes
router.post("/", validateSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
	profileviews
		.create(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
function validateSchema(req, res, next) {
	const schema = Joi.object({
		user_id: Joi.number().required(),
		mobile_number: Joi.number().required(),
		country_iso2: Joi.string().required(),
	});
	validateRequest(req, next, schema).catch((err) => {
		res.status(400).json(err);
	});
}
function getAll(req, res, next) {
	res.status(405).json({
		status: false,
		errorMessage: "GET Method is not allowed",
	});
}
function getById(req, res, next) {
	profileviews
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
	profileviews
		.delete(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
