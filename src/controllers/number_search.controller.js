const express = require("express");
const router = express.Router();
const validateRequest = require("../_middleware/validateRequest");
const Joi = require("joi");
const number_search = require("../services/number_search.service");
// routes
router.post("/", validateSchema, searchNumber);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

async function searchNumber(req, res, next) {
	number_search
		.search(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
function validateSchema(req, res, next) {
	const schema = Joi.object({
		iso2: Joi.string().required(),
		mobile_number: Joi.number().required(),
	});
	validateRequest(req, next, schema).catch((err) => {
		res.status(404).json(err);
	});
}
async function getAll() {
	res.status(404).json({
		status: false,
		errorMessage: "GET NOT ALLOWED",
	});
}

async function getById() {
	res.status(404).json({
		status: false,
		errorMessage: "GET_BY_ID NOT ALLOWED",
	});
}

async function update() {
	res.status(404).json({
		status: false,
		errorMessage: "PUT NOT ALLOWED",
	});
}

async function _delete() {
	res.status(404).json({
		status: false,
		errorMessage: "DELETE NOT ALLOWED",
	});
}
