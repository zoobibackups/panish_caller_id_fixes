const countries = require("../data/countries.json");
const pool = require("../_helpers/poolConnection");
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
			state: false,
			errorMessage: "This method GET is not allowed",
		});
	});
}

async function getById(id) {
	return new Promise(async (resolve, reject) => {
		resolve({
			status: true,
			successMessage: "Your friend list get successfully.",
			contacts: [],
		});
	});
}

async function create(data) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				const promises = data.contacts.map(async (item, index) => {
					return getCountryIdByIso2(item.country_iso2).then(async (country_id) => {
						return findOrCreateFilteredContact(item, country_id, data.userId, connection)
							.then((filtered_contact_id) => {
								return filtered_contact_id;
							})
							.catch((err) => {
								return err;
							});
					});
				});
				return Promise.all(promises)
					.then((results) => {
						insertIntoUserFriends(results, connection)
							.then((data) => {
								connection.release();
								console.log("insertIntoUserFriends then", data);
								resolve({
									status: true,
									successMessage: "Your friend list is updated insertIntoUserFriends then",
									contacts: [],
								});
							})
							.catch((err) => {
								console.log("insertIntoUserFriends catch", err);
								connection.release();
								resolve({
									status: true,
									successMessage: "Your friend list is updated insertIntoUserFriends catch",
									contacts: [],
								});
							});
					})
					.catch((err) => {
						console.log("all promises catch", err);
						connection.release();
						resolve({
							status: true,
							successMessage: "Your friend list is updated all promises catch",
							contacts: [],
						});
					});
			})
			.catch((err) => {
				console.log("Catch before finally", err);

				resolve({
					status: true,
					successMessage: "Your friend list is updated catch before finally",
					contacts: [],
				});
			});
	});
}

async function update() {
	return new Promise(async (resolve, reject) => {
		reject({
			state: false,
			errorMessage: "This method PUT is not allowed",
		});
	});
}

async function _delete() {
	return new Promise(async (resolve, reject) => {
		reject({
			state: false,
			errorMessage: "This method DELETE is not allowed",
		});
	});
}

async function getCountryIdByIso2(iso2) {
	return new Promise(async (resolve, reject) => {
		let country = countries.find((country) => country.iso2 === iso2);
		if (country) {
			resolve(country.id);
		} else {
			resolve(countries[233].id);
		}
	});
}

async function findOrCreateFilteredContact(item, country_id, user_id, connection) {
	return new Promise(async (resolve, reject) => {
		let query = `INSERT INTO filtered_contacts (name, mobile_number, name_check, country_id) VALUES ('${item.name}', '${item.mobile_number}', '1', ${country_id}) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), name = VALUES(name), name_check = VALUES(name_check), country_id = VALUES(country_id)`;
		try {
			const [results, metadata] = await connection.query(query);
			resolve({ filtered_contact_id: results.insertId, name: item.name, country_id: country_id, user_id: user_id });
		} catch (err) {
			reject(null);
		}
	});
}



async function insertIntoUserFriends(friendData, connection) {
	return new Promise(async (resolve, reject) => {
		const values = friendData
			.filter((data) => data !== null)
			.map(({ name, user_id, filtered_contact_id, country_id }) => `('${name}', '${user_id}', '${filtered_contact_id}', '${country_id}')`)
			.join(", ");
		if (values.length != 0) {
			const query = `INSERT IGNORE INTO user_friends (name,user_id ,filtered_contact_id,country_id) VALUES ${values} ON DUPLICATE KEY UPDATE name = VALUES(name),filtered_contact_id = VALUES(filtered_contact_id),user_id=VALUES(user_id),country_id=VALUES(country_id)`;
			try {
				let [results, metadata] = await connection.query(query);
				resolve(results);
			} catch (error) {
				reject(error);
			}
		} else {
			resolve([]);
		}
	});
}


// async function insertIntoUserFriends(friendData, connection) {
// 	return new Promise(async (resolve, reject) => {
// 		const values = friendData
// 		    .filter(data => data !== null)
// 			.map(({ name, user_id, filtered_contact_id, country_id }) => `('${name}', '${user_id}', '${filtered_contact_id}', '${country_id}')`)
// 			.join(", ");
// 		const query = `INSERT IGNORE INTO user_friends (name,user_id ,filtered_contact_id,country_id) VALUES ${values} ON DUPLICATE KEY UPDATE name = VALUES(name),filtered_contact_id = VALUES(filtered_contact_id),user_id=VALUES(user_id),country_id=VALUES(country_id)`;
// 		try {
// 			let [results, metadata] = await connection.query(query);
// 			resolve(results);
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }
