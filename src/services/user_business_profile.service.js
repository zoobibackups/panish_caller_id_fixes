const { getByIso2 } = require("./countires.service");
const pool = require("../_helpers/poolConnection");
module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getByUserId,
};

async function getAll() {
	return new Promise(async (resolve, reject) => {
		reject({
			status: false,
			successMessage: "This method GET is not allowed",
		});
	});
}



async function create(data) {
	const {user_id,company_name,business_email,company_description,categoryId,company_website,state,city,zip,countryiso2} = data;
	return new Promise(async (resolve, reject) => {
		getByIso2(countryiso2)
			.then((country) => {
				return pool
			.getConnection()
			.then(async (connection) => {
				let insertQuery = `INSERT INTO user_business_profile (id, user_id, company_name, business_email, company_description, categoryId, company_website, state, city, zip, country_id) VALUES (NULL, '${user_id}', '${company_name}', '${business_email}', '${company_description}', '${categoryId}', '${company_website}', '${state}', '${city}', '${zip}', '${country.id}') ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), user_id=VALUES(user_id), company_name=VALUES(company_name), business_email=VALUES(business_email), company_description=VALUES(company_description),categoryId=VALUES(categoryId),company_website=VALUES(company_website), state=VALUES(state), city=VALUES(city), zip=VALUES(zip), country_id=VALUES(country_id)`	
				try {
					let [results] = await connection.query(insertQuery);
					connection.release();
					let buninessProfile = await getById(results.insertId)
					resolve({
						status: true,
						buninessProfile:buninessProfile.buninessProfile ,
						successMessage: "Business has been created successfully",
					});
				} catch (error) {
					connection.release();
					reject({
						status: false,
						buninessProfile: error,
						successMessage: "Business with the given country code not found",
					});
				}
			}).catch((err) => {
				reject({
					status: false,
					buninessProfile: null,
					successMessage: "Server overloaded",
				})
			})
				
			})
	});
}

async function update(id, data) {
	const {user_id,company_name,business_email,company_description,categoryId,company_website,state,city,zip,countryiso2} = data;
	return new Promise(async (resolve, reject) => {
		getByIso2(countryiso2)
			.then((country) => {
				return pool
			.getConnection()
			.then(async (connection) => {
				let insertQuery = `INSERT INTO user_business_profile (id, user_id, company_name, business_email, company_description, categoryId, company_website, state, city, zip, country_id) VALUES (NULL, '${user_id}', '${company_name}', '${business_email}', '${company_description}', '${categoryId}', '${company_website}', '${state}', '${city}', '${zip}', '${country.id}') ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), user_id=VALUES(user_id), company_name=VALUES(company_name), business_email=VALUES(business_email), company_description=VALUES(company_description),categoryId=VALUES(categoryId),company_website=VALUES(company_website), state=VALUES(state), city=VALUES(city), zip=VALUES(zip), country_id=VALUES(country_id)`	
				try {
					let [results] = await connection.query(insertQuery);
					connection.release();
					let buninessProfile = await getById(results.insertId)
					resolve({
						status: true,
						buninessProfile:buninessProfile.buninessProfile ,
						successMessage: "Business has been created successfully",
					});
				} catch (error) {
					connection.release();
					reject({
						status: false,
						buninessProfile: error,
						successMessage: "Business with the given country code not found",
					});
				}
			}).catch((err) => {
				reject({
					status: false,
					buninessProfile: null,
					successMessage: "Server overloaded",
				})
			})
				
			})
	});
}


// removed sequilizes
async function _delete(id) {
	
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let deleteQuery = `DELETE FROM user_business_profile WHERE user_business_profile.id = ${id}`;
				try {
					let [results] = await connection.query(deleteQuery);
					connection.release();
					resolve({
						status: true,
						successMessage: "Buniess Account Delete Successfully",
					});
				} catch (error) {
					connection.release();
					resolve({
						status: true,
						successMessage: "Buniess Account Delete Successfully",
					});
				}
			})
			.catch((err) => {
				resolve({
					status: true,
					successMessage: "Buniess Account Delete Successfully",
				});
			});
	});
}

async function findById(id) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let businessQuery = `SELECT ubp.id,cr.name as country_name,c.name as catgeory_name,  cr.iso2 as country_iso2, ubp.user_id,ubp.state, ubp.city, ubp.zip, ubp.company_name, ubp.business_email,ubp.company_website, ubp.company_description from user_business_profile ubp LEFT JOIN categories c ON ubp.categoryId = c.id LEFT JOIN countries cr ON ubp.country_id = cr.id where ubp.id = '${id}'`;
				try {
					let [results] = await connection.query(businessQuery);
					connection.release();
					resolve(results[0]);
				} catch (error) {
					connection.release();
					resolve(null)
				}
			})
			.catch((err) => {
				resolve(null);
			});
	});
}

async function getByUserId(id) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				let businessQuery = `SELECT ubp.id,cr.name as country_name,c.name as catgeory_name, cr.iso2 as country_iso2, ubp.user_id,ubp.state, ubp.city, ubp.zip, ubp.company_name, ubp.business_email,ubp.company_website, ubp.company_description from user_business_profile ubp LEFT JOIN categories c ON ubp.categoryId = c.id LEFT JOIN countries cr ON ubp.country_id = cr.id where ubp.user_id = '${id}'`;
				try {
					let [results] = await connection.query(businessQuery);
					connection.release();
					if(results.length > 0){
					  resolve(results[0]);  
					}else{
					    reject({
						status: false,
						buninessProfile: null,
						successMessage: "Business with the given country code not found",
					});
					}
					
				} catch (error) {
					connection.release();
					reject({
						status: false,
						buninessProfile: null,
						successMessage: "Business with the given country code not found",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					buninessProfile: null,
					successMessage: "Business with the given country code not found",
				});
			});
	});
}

async function getById(id) {
	return new Promise(async (resolve, reject) => {
		findById(id)
			.then((buniness_profile) => {
				resolve({
					status: true,
					buninessProfile: buniness_profile,
					successMessage: "Business Profile has been found Successfully",
				});
			})
			.catch((err) => {
				reject({
					status: false,
					buniness_profile: null,
					successMessage: "Business Profile does not exist",
				});
			});
	});
}