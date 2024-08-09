const { getByIso2 } = require("./countires.service");
const pool = require("../_helpers/poolConnection");
module.exports = {
	login,
	register,
	getAll,
	getById,
	update,
	delete: _delete,
	findByNumber,
	updateProfilePicture,
	findUserById,
};

async function login({ email, password, ipAddress }) {}

async function register(params) {
	return new Promise(async (resolve, reject) => {
		findUserByEmailOrMobileNumberAndCountryId(params)
			.then((data) => {
				if (data.status) {
					resolve(data);
				} else {
					return createNewUserAndReturn(params)
						.then((data) => {
							resolve(data);
						})
						.catch((err) => {
							reject(err);
						});
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

async function getAll() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "This method GET is not allowed",
		});
	});
}

function getById(id) {
	return new Promise((resolve, reject) => {
		return findUserById(id)
			.then((user) => {
				resolve({
					status: true,
					user: user,
					message: "User has been found Successfully",
				});
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "User does not exist",
				});
			});
	});
}

async function update(id, params) {
	return new Promise(async (resolve, reject) => {
		return updateUser(id, params)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

async function findByNumber(params) {
	return new Promise(async (resolve, reject) => {
		findUserByNumber(params)
			.then((user) => {
				resolve({
					status: true,
					user: user,
					message: "User has been found Successfully",
				});
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "User does not exist",
				});
			});
	});
}

// Removed sequilize

async function updateUser(id, params) {
	const { first_name, last_name, mobile_number, email, profile_url, date_of_birth, gender, type, device_token, countryiso2 } = params;
	return new Promise(async (resolve, reject) => {
		return getByIso2(countryiso2)
			.then((country) => {
				return pool
					.getConnection()
					.then(async (connection) => {
						try {
							let query = `UPDATE users SET first_name = '${first_name}',last_name = '${last_name}', mobile_number = '${mobile_number}', email = '${email}', profile_url = '${profile_url}', date_of_birth = '${date_of_birth}', gender = '${gender}' WHERE users.id = '${id}'`;
							let [results, metadata] = await connection.query(query);
							connection.release();
							if (results) {
								return addAddressOrUpdate({
									userId: id,
									city: params.city,
									zip: params.zip,
									state: params.state,
									country_id: country.id,
								})
									.then((data) => {
										return findUserById(id)
											.then((data) => {
												resolve({
													status: true,
													user: data,
													message: "User Updated successfully",
												});
											})
											.catch((err) => {
												reject({
													status: false,
													user: null,
													message: "There went some thing wrong",
												});
											});
									})
									.catch((err) => {
										reject({
											status: false,
											user: null,
											message: "There went some thing wrong white adding address",
										});
									});
							} else {
								reject({
									status: false,
									user: null,
									message: "There went some thing wrong white creating users",
								});
							}
						} catch (error) {
							connection.release();
							reject({
								status: false,
								user: null,
								message: "There went some thing wrong white creating users",
							});
						}
					})
					.catch((err) => {
						reject({
							status: false,
							user: null,
							message: "Server is overloaded, max number of users reached. please try after some time",
						});
					});
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "There went some thing wrong white creating users",
				});
			});
	});
}
// cleared funtions

async function _delete(id) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let query = `DELETE FROM users WHERE users.id = ${id}`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						user: null,
						message: "User has been deleted successfully",
					});
				} catch (error) {
					connection.release();
					reject({
						status: false,
						user: null,
						message: "This user has already deleted",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "This user has already deleted",
				});
			});
	});
}

async function updateProfilePicture(params) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				try {
					let query = `UPDATE users SET profile_url = '${params.ProfileUrl}' WHERE users.id = '${params.userId}'`;
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						message: "Profile Picture Uploaded",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: true,
						message: "Profile Picture Uploaded Failed",
					});
				}
			})
			.catch((err) => {
				resolve({
					status: true,
					message: "Profile Picture Uploaded Failed",
				});
			});
	});
}

async function addAddressOrUpdate({ userId, state, city, zip, country_id }) {
	return new Promise((resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let query = `INSERT IGNORE INTO address (userId, state, city, zip, country_id) VALUES ('${userId}', '${state}', '${city}', '${zip}', '${country_id}')  ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), userId = VALUES(userId), state = VALUES(state), city = VALUES(city), zip = VALUES(zip), country_id = VALUES(country_id)`;

				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve(results);
				} catch (error) {
					connection.release();
					resolve(err);
				}
			})
			.catch((err) => {
				resolve(err);
			});
	});
}

async function createNewUserAndReturn(params) {
	const { first_name, last_name, mobile_number, email, profile_url, date_of_birth, gender, type, device_token, countryiso2 } = params;
	return new Promise(async (resolve, reject) => {
		return getByIso2(countryiso2)
			.then((country) => {
				return pool
					.getConnection()
					.then(async (connection) => {
						try {
							let query = `INSERT INTO users (id, first_name, last_name, mobile_number, email, profile_url, date_of_birth, gender, type, device_token, country_id, createdAt, updatedAt) VALUES (NULL, '${first_name}', '${last_name}', '${mobile_number}', '${email}', '${[
								profile_url,
							]}', '${date_of_birth}', '${gender}', '${type}', '${device_token}', '${country.id}', current_timestamp(), current_timestamp());`;
							let [results, metadata] = await connection.query(query);
							connection.release();
							if (results) {
								return addAddressOrUpdate({
									userId: results.insertId,
									city: params.city,
									zip: params.zip,
									state: params.state,
									country_id: country.id,
								})
									.then((data) => {
										return findUserById(results.insertId)
											.then((data) => {
												resolve({
													status: true,
													message: "User Created successfully",
													user: data,
												});
											})
											.catch((err) => {
												reject({
													status: false,
													user: null,
													message: "There went some thing wrong",
												});
											});
									})
									.catch((err) => {
										reject({
											status: false,
											user: null,
											message: "There went some thing wrong white adding address",
										});
									});
							} else {
								reject({
									status: false,
									user: null,
									message: "There went some thing wrong white creating users",
								});
							}
						} catch (error) {
							connection.release();
							reject({
								status: false,
								user: null,
								message: "There went some thing wrong white creating users",
							});
						}
					})
					.catch((err) => {
						reject({
							status: false,
							user: null,
							message: "Server is overloaded, max number of users reached. please try after some time",
						});
					});
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "",
				});
			});
	});
}

async function findUserByNumber(params) {
	return new Promise(async (resolve, reject) => {
		return getByIso2(params.countryiso2)
			.then((country) => {
				return pool
					.getConnection()
					.then(async (connection) => {
						let query = `SELECT u.id,u.first_name, u.last_name,u.mobile_number,u.email,u.profile_url, u.date_of_birth,u.gender,u.type,u.device_token, countries.name as country_name ,countries.iso2 as country_iso2, a.state, a.zip, a.city FROM users u LEFT JOIN address a ON u.id = a.userId LEFT JOIN countries ON u.country_id = countries.id WHERE (u.mobile_number = '${params.mobile_number}' && u.country_id = '${country.id}')`;
						try {
							let [results, metadata] = await connection.query(query);
							connection.release();
							if (results.length > 0) {
								resolve(results[0]);
							} else {
								reject(null);
							}
						} catch (error) {
							connection.release();
							reject(null);
						}
					})
					.catch((err) => {
						reject(null);
					});
			})
			.catch((err) => {
				reject(null);
			});
	});
}

async function findUserById(id) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let query = `SELECT u.id,u.first_name, u.last_name,u.mobile_number,u.email,u.profile_url,u.date_of_birth,u.gender,u.type,u.device_token,  countries.name as country_name ,countries.iso2 as country_iso2, a.state, a.zip, a.city FROM users u LEFT JOIN address a ON u.id = a.userId LEFT JOIN countries ON u.country_id = countries.id WHERE u.id = '${id}'`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					if (results.length > 0) {
						resolve(results[0]);
					} else {
						reject(null);
					}
				} catch (error) {
					connection.release();
					reject(null);
				}
			})
			.catch((err) => {
				reject(null);
			});
	});
}

async function findUserByEmailOrMobileNumberAndCountryId(params) {
	return new Promise(async (resolve, reject) => {
		getByIso2(params.countryiso2)
			.then((country) => {
				pool.getConnection()
					.then(async (connection) => {
						let query = `SELECT u.id,u.first_name, u.last_name,  u.mobile_number,u.email,u.profile_url,u.date_of_birth,u.gender,u.type,u.device_token, countries.name as country_name ,countries.iso2 as country_iso2, a.state, a.zip, a.city FROM users u LEFT JOIN address a ON u.id = a.userId LEFT JOIN countries ON u.country_id = countries.id WHERE (u.mobile_number = '${params.mobile_number}' && u.country_id = '${country.id}') || u.email = '${params.email}'`;
						try {
							let [results, metadata] = await connection.query(query);
							connection.release();
							if (results.length > 0) {
								resolve({
									status: true,
									message: "User Found successfully",
									user: results[0],
								});
							} else {
								resolve({
									status: false,
									user: null,
									message: "User Not Exist",
								});
							}
						} catch (error) {
							connection.release();
							reject({
								status: false,
								user: null,
								message: "There is some unknow issue with server.Please try again later",
							});
						}
					})
					.catch((err) => {
						reject({
							status: false,
							user: null,
							message: "Due to high volume of active users Server is bussy please try again later",
						});
					});
			})
			.catch((err) => {
				reject({
					status: false,
					user: null,
					message: "user with the given country code not found",
				});
			});
	});
}
