module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};
function getAll() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "GET is not allowed",
		});
	});
}

function getById() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "GET_BY_ID is not allowed",
		});
	});
}

function create() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "POST is not allowed",
		});
	});
}

function update() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "PUT is not allowed",
		});
	});
}

function _delete() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "DELETE is not allowed",
		});
	});
}
