const express = require("express");
const router = express.Router();
const report_spam = require("../services/spam_report.service");
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
// routes
router.post("/", createSchema, create);
router.get("/", getAll);
router.get("/:mobile_number/:iso2", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function create(req, res, next) {
	report_spam
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
		name: Joi.string().allow("", null),
	});
	validateRequest(req, next, schema);
}
function getAll(req, res, next) {
	report_spam
		.getAll()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(200).json(err);
		});
}
function getById(req, res, next) {
	report_spam
		.getById(req.params)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(200).json(err);
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
