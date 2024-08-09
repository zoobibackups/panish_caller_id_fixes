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
			errorMessage: "GET is not allowed",
		});
	});
}

async function getById(id) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				let query = `SELECT wd.*, d.short_name, d.name from working_days wd LEFT JOIN days d ON wd.dayId = d.id where wd.businessId = '${id}'`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						data: results,
						successMessage: "Business Added Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						data: [],
						successMessage: JSON.stringify(error),
					});
				}
			})
			.catch((err) => {
				resolve({
					status: true,
					data: [],
					successMessage: "SERVER OVer loaded",
				});
			});
	});
}

async function create(data) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				const values = data.days
					.map(({ dayId, open_time, close_time }) => `('${data.businessId}','${dayId}', '${open_time}', '${close_time}')`)
					.join(", ");
				const query = `INSERT IGNORE INTO working_days (businessId, dayId, open_time, close_time) VALUES ${values}`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						successMessage: "Business Added Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						successMessage: JSON.stringify(error),
					});
				}
			})
			.catch((err) => {
				resolve({
					status: false,
					successMessage: "Server Overloaed, try agian",
				});
			});
	});
}

async function update(businessId, data) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				const values = data.days
					.map(({ dayId, open_time, close_time }) => `('${data.businessId}','${dayId}', '${open_time}', '${close_time}')`)
					.join(", ");
				const query = `INSERT IGNORE INTO working_days (businessId, dayId, open_time, close_time) VALUES ${values} ON DUPLICATE KEY UPDATE open_time=VALUES(open_time), close_time=VALUES(close_time)`;
				try {
					let [results, metadata] = await connection.query(query);
					connection.release();
					resolve({
						status: true,
						successMessage: "Business Added Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						successMessage: JSON.stringify(error),
					});
				}
			})
			.catch((err) => {
				resolve({
					status: false,
					successMessage: "Server Overloaed, try agian",
				});
			});
	});
}

async function _delete(id) {
	return new Promise(async (resolve, reject) => {
		pool.getConnection()
			.then(async (connection) => {
				let delete_query = `DELETE FROM working_days WHERE working_days.id = '${id}'`;
				try {
					let [results, metadata] = await connection.query(delete_query);
					connection.release();
					resolve({
						status: true,
						successMessage: "Working Day Delete Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: false,
						errorMessage: "Working Day Delete Successfully",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					errorMessage: "server overloaded",
				});
			});
	});
}
