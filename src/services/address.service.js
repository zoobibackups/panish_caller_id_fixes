const pool = require("../_helpers/poolConnection");
module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getAddressbasicDetalis,
};

async function getAll() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method GET ALL is not allowed",
		});
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

async function create(params) {
	const { userId, state, city, zip, country_id } = params;
	return new Promise((resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let query = `INSERT IGNORE INTO address (userId, state, city, zip, country_id) VALUES ('${userId}', '${state}', '${city}', '${zip}', '${country_id}')  ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), userId = VALUES(userId), state = VALUES(state), city = VALUES(city), zip = VALUES(zip), country_id = VALUES(country_id)`;

				try {
					let [results, metadat] = await  connection.query(query);
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



async function update(id, params) {
	const { state, city, zip } = params;
	return new Promise((resolve, reject) => {
		let query = `UPDATE address SET state = '${state}', city = '${city}', zip = '${zip}' WHERE address.userId = '${id}'`;
		return pool
			.getConnection()
			.then((connection) => {
				try {
					let [results, metadata] = connection.query(query);
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

async function _delete() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			errorMessage: "This method DELETE is not allowed",
		});
	});
}

function getAddressbasicDetalis(data) {
	const { userId, status, city, zip, country_id } = data;
	return { userId, status, city, zip, country_id };
}
