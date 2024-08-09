const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userService = require("../services/users.service");

// routes
router.post("/register", registerSchema, register);
router.post("/findbynumber", findByNumber);
router.post("/updateProfilePicture", updateProfilePicture);
router.get("/:id", getById);
router.put("/:id", registerSchema, update);
router.delete("/:id", _delete);
module.exports = router;

function registerSchema(req, res, next) {
	const schema = Joi.object({
	    first_name: Joi.string().allow(null, '').default('New'),
		last_name: Joi.string().allow(null,"").default('User'),
		mobile_number: Joi.string().required(),
		email: Joi.string().allow(null, ""),
		profile_url: Joi.string().allow(null, ""),
		date_of_birth: Joi.string().allow(null, ""),
		gender: Joi.string().allow(null, ""),
		type: Joi.string().allow(null, ""),
		device_token: Joi.string().allow(null, ""),
		countryiso2: Joi.string().allow(null, ""),
		zip: Joi.string().allow(null, ""),
		city: Joi.string().allow(null, ""),
		state: Joi.string().allow(null, ""),
	});
	validateRequest(req, next, schema);
}

function findByNumber(req, res, next) {
	userService
		.findByNumber(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
function register(req, res, next) {
	userService
		.register(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function getById(req, res, next) {
	userService
		.getById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function update(req, res, next) {
	userService
		.update(req.params.id, req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}

function updateProfilePicture(req, res, next) {
	userService
		.updateProfilePicture(req.body)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
function _delete(req, res, next) {
	userService
		.delete(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => {
			res.status(404).json(err);
		});
}
