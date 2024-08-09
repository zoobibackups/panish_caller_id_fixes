module.exports = validateRequest;

function validateRequest(req, next, schema) {
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: false, // remove unknown props
	};
	const { error, value } = schema.validate(req.body, options);

	if (error) {
		next(`${error.details.map((item) => `${item.message}`.replace(/"/g, ""))}`);
	} else {
		req.body = value;
		next();
	}
}
