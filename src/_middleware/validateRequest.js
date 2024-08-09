module.exports = validateRequest;

function validateRequest(req, next, schema) {
	return new Promise((resolve, reject) => {
		const options = {
			abortEarly: false, // include all errors
			allowUnknown: true, // ignore unknown props
			stripUnknown: true, // remove unknown props
		};
		const { error, value } = schema.validate(req.body, options);
		if (error) {
			reject({
				status: false,
				errorMessage: error.details.map((item) => `${item.message}`.replace(/"/g, "")),
			});
		} else {
			req.body = value;
			next();
		}
	});
}
