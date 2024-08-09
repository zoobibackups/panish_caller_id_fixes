const pool = require("../_helpers/poolConnection");
const countries = require("../data/countries.json");
const users = require("../services/users.service");
module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};
async function getAll() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "GET is not allowed",
		});
	});
}

async function getById() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "GET_BY_ID is not allowed",
		});
	});
}

async function create(params) {
	const { userId, mobile_number, country_iso2, name } = params;
	return new Promise(async (resolve, reject) => {
		let country = countries.find((country) => country.iso2 === country_iso2);
		if (country) {
			return users
				.findUserById(userId)
				.then((user) => {
					return pool
						.getConnection()
						.then(async (connection) => {
							return findOrCreateFilteredContact(name, mobile_number, country.id, user.id, connection)
								.then((filtered_contact) => {
									return InsertOrUpdateSuggestName(name, filtered_contact.filtered_contact_id, user.id, connection)
										.then((data) => {
											connection.release()
											resolve({
												status: true,
												data: {
													id:data,
													name:name,
													filtered_contact_id:filtered_contact.filtered_contact_id,
													user_id:userId
												},
												successMessage: "Number Suggestion Successfully",
											});
										})
										.catch((err) => {
											connection.release()
											resolve({
												status: false,
												data: err,
												errorMessage: "Number Suggestion Error",
											});
										});
								})
								.catch((err) => {
									connection.release()
									resolve({
										status: false,
										data: err,
										errorMessage: "Contact not Found Nor Inserted",
									});
								});
						})
						.catch((err) => {
							resolve({
								status: false,
								data: null,
								errorMessage: "Server Over Loaded",
							});
						});
				})
				.catch(() => {
					resolve({
						status: false,
						data: null,
						errorMessage: "User Not Found",
					});
				});
		} else {
			resolve({
				status: false,
				data: null,
				errorMessage: "Country Not Found",
			});
		}
	});
}

async function update(businessId, data) {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "GET is not allowed",
		});
	});
}

async function _delete(id) {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "DELETE is not allowed",
		});
	});
}

async function findOrCreateFilteredContact(name, mobile_number, country_id, user_id, connection) {
	return new Promise(async (resolve, reject) => {
		let query = `INSERT INTO filtered_contacts (name, mobile_number, name_check, country_id) VALUES ('${name}', '${mobile_number}', '1', ${country_id}) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), name = VALUES(name), name_check = VALUES(name_check), country_id = VALUES(country_id)`;
		try {
			const [results, metadata] = await connection.query(query);
			resolve({ filtered_contact_id: results.insertId, name: name, country_id: country_id, user_id: user_id });
		} catch (err) {
			reject(query);
		}
	});
}

async function InsertOrUpdateSuggestName(name, fcid, uid, connection) {
	return new Promise(async (resolve, reject) => {
		let insertQuery = `INSERT IGNORE INTO number_name_suggestion (id, name, filtered_contact_id, user_id) VALUES (NULL, '${name}', '${fcid}', '${uid}') ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), name = VALUES(name)`;
		try {
			let [results, metadata] = await connection.query(insertQuery);
			if (results) {
				resolve(results.insertId);
			} else {
				reject(null);
			}
		} catch (error) {
			reject(null);
		}
	});
}
