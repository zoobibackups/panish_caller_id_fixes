const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validateRequest");
const user_business_profile = require("../services/user_business_profile.service");

// routes
router.post("/", createSchema, create);
router.get("/:id", getById);
router.get("/getByUserId/:id", getByUserId);
router.put("/:id", createSchema, update);
router.delete("/:id", _delete);
module.exports = router;

function createSchema(req, res, next) {
	const schema = Joi.object({
		user_id: Joi.number().required(),
		company_name: Joi.string().required(),
		business_email: Joi.string().email().required(),
		company_description: Joi.string().required(),
		categoryId: Joi.number().required(),
		company_website: Joi.string().required(),
		state: Joi.string().required(),
		city: Joi.string().required(),
		zip: Joi.string().required(),
		countryiso2: Joi.string().required(),
	});
	validateRequest(req, next, schema).catch((err) => {
		res.status(400).json(err);
	});
}

function create(req, res, next) {
	user_business_profile
		.create(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function getById(req, res, next) {
	user_business_profile
		.getById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function update(req, res, next) {
	user_business_profile
		.update(req.params.id, req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function _delete(req, res, next) {
	user_business_profile
		.delete(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function getByUserId(req, res, next) {
	user_business_profile
		.getByUserId(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
