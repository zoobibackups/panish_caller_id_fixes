const countries = require("../data/countries.json")
module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getByIso2,
};

async function getAll() {
	return new Promise(async (resolve, reject) => {
		resolve({
			status: true,
			successMessage: "Countires Data get successfully",
			countries: countries,
		});
	});
}

async function getByIso2(iso2) {
	return new Promise(async (resolve, reject) => {
		let country= countries.find(country => country.iso2 === iso2)
		if(country){
			resolve(country)
		}else{
			resolve(countries[233])
		}
		
	});
}

async function getById() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method GET BY ID is not allowed",
		});
	});
}

async function create() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method POST is not allowed",
		});
	});
}

async function update() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method PUT is not allowed",
		});
	});
}

async function _delete() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method DELETE is not allowed",
		});
	});
}
