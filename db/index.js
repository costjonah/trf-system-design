const pg = require("pg");
const config = require("../config.js");

const pool = new pg.Pool({
  user: "JonahC",
  host: "localhost",
  database: "products",
  password: config.dbPassword,
  port: 5432,
});

pool.connect();

module.exports = pool;
