const { getNetwork } = require("./network.service");
const pool = require("../_helpers/poolConnection");
module.exports = {
	getAll,
	getById,
	search,
	update,
	delete: _delete,
	getContactDetailsFromDatabase1,
	getContactDetailsFromDatabase2,
};

 function getAll() {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			message: "GET is not allowed",
		});
	});
}

 function getById(id) {
	return new Promise((resolve, reject) => {
		reject({
			status: false,
			message: "GET_BY_ID is not allowed",
		});
	});
}

async function search(params) {
	return new Promise((resolve, reject) => {
		return checkifAppUser(params)
			.then((data) => {
				
				resolve(data);
			})
			.catch((err) => {
				/// the coontact  is not the search in all tables and get the results
				getContactDetailsFromDatabase2(params)
					.then((data) => {
						resolve(data);
					})
					.catch(async (err) => {
					    resolve({
							status: false,
							db: "db2",
							message: "Not Data Found",
							appuser: false,
							appuserresults: null,
							results: null,
							location_info: await getNetwork(params),
						});
					});
			});
	});
}

async function update() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "PUT is not allowed",
		});
	});
}

async function _delete() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			message: "DELETE is not allowed",
		});
	});
}

async function checkifAppUser(params) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				const [results, metadata] = await connection.query(
					`select users.*, countries.name, countries.iso2, filtered_contacts.name_check as spam_count from users  join countries on users.country_id = countries.id join filtered_contacts on filtered_contacts.mobile_number = users.mobile_number where users.mobile_number = '${params.mobile_number}'`
				);
				connection.release();
				if (results.length > 0) {
					resolve({
						status: true,
						db: "db1",
						appuser: true,
						message: "Contact found successfully",
						appuserresults: results[0],
						results: null,
						location_info: await getNetwork(params),
					});
				} else {
					reject();
				}
			})
			.catch((err) => {
				
				reject();
			});
	});
}

async function getContactDetailsFromDatabase1(params) {
	return new Promise(async (resolve, reject) => {
	    reject();
// 		return pool
// 			.getConnection()
// 			.then(async (connection) => {
// 				// const [results, metadata] = await connection.query(
// 				// 	`SELECT filtered_contacts.id AS filtered_contact_id, filtered_contacts.name AS filtered_contact_name,user_friends.name AS suggested_name, COUNT(*) AS count, (SELECT COUNT(*) AS count FROM filtered_contacts INNER JOIN spam_report ON filtered_contacts.id = spam_report.filtered_contact_id INNER JOIN countries ON filtered_contacts.country_id = countries.id WHERE filtered_contacts.mobile_number = '${params.mobile_number}' AND countries.iso2 = '${params.iso2}' GROUP BY filtered_contacts.id,filtered_contacts.name HAVING COUNT(*) > -1) as spam_check FROM filtered_contacts INNER JOIN user_friends ON filtered_contacts.id = user_friends.filtered_contact_id  INNER JOIN countries ON filtered_contacts.country_id = countries.id  WHERE filtered_contacts.mobile_number ='${params.mobile_number}' AND countries.iso2 = '${params.iso2}' GROUP BY filtered_contacts.id,filtered_contacts.name, filtered_contacts.name_check, user_friends.name HAVING COUNT(*) > -1 UNION SELECT filtered_contacts.id AS filtered_contact_id, filtered_contacts.name AS filtered_contact_name,  number_name_suggestion.name AS suggested_name,COUNT(*) AS count,(SELECT COUNT(*) AS count FROM filtered_contacts INNER JOIN spam_report ON filtered_contacts.id = spam_report.filtered_contact_id INNER JOIN countries ON filtered_contacts.country_id = countries.id WHERE filtered_contacts.mobile_number = '${params.mobile_number}' AND countries.iso2 = '${params.iso2}' GROUP BY filtered_contacts.id,filtered_contacts.name HAVING COUNT(*) > 0) as spam_check  FROM filtered_contacts INNER JOIN number_name_suggestion ON filtered_contacts.id = number_name_suggestion.filtered_contact_id WHERE filtered_contacts.mobile_number = '${params.mobile_number}' GROUP BY filtered_contacts.id, filtered_contacts.name, filtered_contacts.name_check, number_name_suggestion.name HAVING COUNT(*) > -1 ORDER BY count ASC`
// 				//     );
				
// 			const [results, metadata] = await connection.query(`SELECT filtered_contacts.id AS filtered_contact_id, filtered_contacts.name AS filtered_contact_name,user_friends.name AS suggested_name, COUNT(*) AS count, (SELECT COUNT(*) AS count FROM filtered_contacts INNER JOIN spam_report ON filtered_contacts.id = spam_report.filtered_contact_id INNER JOIN countries ON filtered_contacts.country_id = countries.id WHERE filtered_contacts.mobile_number = '${params.mobile_number}' AND countries.iso2 = '${params.iso2}' GROUP BY filtered_contacts.id,filtered_contacts.name HAVING COUNT(*) > -1) as spam_check FROM filtered_contacts INNER JOIN user_friends ON filtered_contacts.id = user_friends.filtered_contact_id  INNER JOIN countries ON filtered_contacts.country_id = countries.id  WHERE filtered_contacts.mobile_number ='${params.mobile_number}' AND countries.iso2 = '${params.iso2}' GROUP BY filtered_contacts.id,filtered_contacts.name, filtered_contacts.name_check, user_friends.name HAVING COUNT(*) > -1`);
				
// 				connection.release();
// 				if (results.length > 0) {
// 					resolve({
// 						status: true,
// 						db: "db1",
// 						appuser: false,
// 						message: "Contact found successfully",
// 						appuserresults: null,
// 						results: {
// 							filtered_contact_id: results[0].filtered_contact_id,
// 							filtered_contact_name: results[0].filtered_contact_name,
// 							spam_check: results[0].spam_check == null ? 0 : results[0].spam_check,
// 							suggested_names: [] // await removeAttributes(results.reverse()),
// 						},
// 						location_info: await getNetwork(params),
// 					});
// 				} else {
// 					reject();
// 				}
// 			})
// 			.catch((err) => {
// 				reject();
// 			});
	});
}

async function getContactDetailsFromDatabase2(params) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				const [results, metadata] = await connection.query(
					`SELECT id , personName from truecall_central_caller_database_new.contactsdb where nationalNumber = '${params.mobile_number}' and countryId = (SELECT id from countries WHERE countries.iso2 = '${params.iso2}') LIMIT 1`
				);
				if (results.length > 0) {
					connection.release();
					resolve({
						status: true,
						db: "db2",
						appuser: false,
						message: "Contact found successfully",
						appuserresults: null,
						results: {
							filtered_contact_id: results[0].id,
							filtered_contact_name: results[0].personName,
							spam_check: 0,
							suggested_names: [
								{
									suggested_name: results[0].personName,
									count: 1,
								},
							],
						},
						location_info: await getNetwork(params),
					});
				} else {
					const [results, metadata] = await connection.query(
						`SELECT id , personName from truecall_central_caller_database_new.contactsdb2 where nationalNumber = '${params.mobile_number}' and countryId = (SELECT id from countries WHERE countries.iso2 = '${params.iso2}') LIMIT 1`
					);
					if (results.length > 0) {
						connection.release();
						resolve({
							status: true,
							db: "db2",
							appuser: false,
							message: "Contact found successfully",
							appuserresults: null,
							results: {
								filtered_contact_id: results[0].id,
								filtered_contact_name: results[0].personName,
								spam_check: 0,
								suggested_names: [
									{
										suggested_name: results[0].personName,
										count: 1,
									},
								],
							},
							location_info: await getNetwork(params),
						});
					} else {
						const [results, metadata] = await connection.query(
							`SELECT id , personName from truecall_central_caller_database_new.contactsdb3 where nationalNumber = '${params.mobile_number}' and countryId = (SELECT id from countries WHERE countries.iso2 = '${params.iso2}') LIMIT 1`
						);
						if (results.length > 0) {
							connection.release();
							resolve({
								status: true,
								db: "db2",
								appuser: false,
								message: "Contact found successfully",
								appuserresults: null,
								results: {
									filtered_contact_id: results[0].id,
									filtered_contact_name: results[0].personName,
									spam_check: 0,
									suggested_names: [
										{
											suggested_name: results[0].personName,
											count: 1,
										},
									],
								},
								location_info: await getNetwork(params),
							});
						} else {
							reject();
						}
					}
				}
			})
			.catch((err) => {
				reject();
			});
	});
}

async function removeAttributes(arr) {
	await arr.forEach((obj) => {
		delete obj.filtered_contact_id, delete obj.filtered_contact_name;
		delete obj.spam_check;
	});
	return arr;
}
