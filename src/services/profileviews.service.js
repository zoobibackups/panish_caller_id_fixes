module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};
 function getAll() {
	return new Promise( (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "Method GET is not allowed",
		});
	});
}

 function getById() {
	return new Promise( (resolve, reject) => {
		resolve({
			status: false,
			data: [],
			errorMessage: "Profile View Found",
		});
	});
}

 function create() {
	return new Promise( (resolve, reject) => {
		resolve({
			status: false,
			errorMessage: "User Not Found",
		});
	});
}

 function update() {
	return new Promise( (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "PUT is not allowed",
		});
	});
}

 function _delete() {
	return new Promise( (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "DELETE is not allowed",
		});
	});
}
