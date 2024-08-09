const categories  = require("../data/categories.json")
module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};

async function getAll() {
	return new Promise(async (resolve, reject) => {
		resolve({
			status: true,
			data: categories,
			message: "data Retrive Successfully",
		});
	});
}

async function getById() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "This method GET BY ID is not allowed",
		});
	});
}

async function create(params) {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "This method POST is not allowed",
		});
	});
}

async function update(id, params) {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "This method PUT is not allowed",
		});
	});
}

async function _delete() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "This method DELETE is not allowed",
		});
	});
}
