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
			status: false,
			successMessage: "This method GET_ALL is not allowed",
		});
	});
}

async function getById(id) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				let query = `SELECT * FROM user_social_link WHERE user_social_link.user_id = '${id}'`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						data: results,
						successMessage: "Socail Link retrieved Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						data: [],
						errorMessage: "Socail Link retrieved Successfully",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					data: [],
					errorMessage: "Server overloaded",
				});
			});
	});
}
async function create(params) {
	const { type, link, user_id } = params;

	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				try {
					let query = `INSERT INTO user_social_link (id, type, link, user_id) VALUES (NULL, '${type}', '${link}', '${user_id}') ON DUPLICATE KEY UPDATE type=VALUES(type), link=VALUES(link)`;
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						data: null,
						successMessage: "Social Link Created Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: true,
						data: null,
						successMessage: "Social Link Created Successfully",
					});
				}
			})
			.catch((err) => {
				resolve({
					status: true,
					data: null,
					successMessage: "Social Link Created Successfully",
				});
			});
	});
}

async function update(id, params) {
	const { type, link } = params;
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				try {
					let query = `UPDATE user_social_link SET type = '${type}', link = '${link}' WHERE user_social_link.id = '${id}'`;
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						data: null,
						successMessage: "Social Link Created Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: true,
						data: null,
						successMessage: "Social Link Created Successfully",
					});
				}
			})
			.catch((err) => {
				resolve({
					status: true,
					data: null,
					successMessage: "Social Link Created Successfully",
				});
			});
	});
}

async function _delete(id) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				let delete_query = `DELETE FROM user_social_link WHERE user_social_link.id = '${id}'`;
				try {
					let [results, metadata] = await connection.query(delete_query);
					connection.release();
					resolve({
						status: true,
						successMessage: "Socail Link Delete Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						errorMessage: "Socail Link Delete Successfully",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					errorMessage: "Server overloaded",
				});
			});
	});
}
