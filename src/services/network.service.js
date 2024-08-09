const pool = require("../_helpers/poolConnection");
module.exports = { getNetwork };

async function getNetwork(params) {
	return new Promise((resolve, reject) => {
		SearchNetworkName({
			nationalNumber: `${params.mobile_number}`,
			countryISO: params.iso2,
		}).then((network) => {
			resolve(network);
		});
	});
}

async function SearchNetworkName({ nationalNumber, countryISO }) {
	return new Promise(async (resolve, reject) => {
		return pool
			.getConnection()
			.then(async (connection) => {
				const [results, metadata] = await connection.query(
					`SELECT network_max_length, network_min_length,c.name as countryName from truecall_network_codes.countries c Where c.iso2 = '${countryISO}'`
				);
				if (results.length) {
					let countryRow = results[0];
					let min_length = countryRow.network_min_length;
					let max_length = countryRow.network_max_length;
					let conditions = getNumbersBetween(min_length, max_length, nationalNumber);
					const [results1, metadata] = await connection.query(
						`SELECT cn.network as networkName, c.name as countryName FROM truecall_network_codes.countries c JOIN truecall_network_codes.country_networks cn ON c.id = cn.country_id JOIN truecall_network_codes.network_prefixs np ON cn.cn_id = np.network_id WHERE (SUBSTRING('${nationalNumber}', 1, c.network_min_length) = np.prefix  OR ${conditions} SUBSTRING('${nationalNumber}', 1, c.network_max_length) = np.prefix) AND c.iso2 = '${countryISO}'`
					);
					if (results1.length > 0) {
						connection.release();
						resolve(`${results1[0].networkName}, ${results1[0].countryName}`);
					} else {
						connection.release();
						resolve(`Mobile, ${countryRow.countryName}`);
					}
				} else {
					connection.release();
					resolve("Mobile Network");
				}
			})
			.catch((err) => {
				resolve("Mobile Network");
			});
	});
}

function getNumbersBetween(start, end, nationalNumber) {
	let conditions = "";
	let i = start;
	for (i; i <= end; i++) {
		conditions = conditions.concat(nationalNumber.substring(0, i)).concat(" = np.prefix OR ");
	}
	return conditions;
}
