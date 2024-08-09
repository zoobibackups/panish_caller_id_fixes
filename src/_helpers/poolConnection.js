const mysql =  require('mysql2/promise');
const config = require("../../config.json");

const { database, user, password } = config.database;
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: user,
  database: database,
  password:password,
  waitForConnections: true,
  connectionLimit: 5000,
  connectTimeout:2000,
  queueLimit:20,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;