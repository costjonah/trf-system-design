const pg = require("pg");
const config = require("../config.js");

const pool = new pg.Pool({
  user: "JonahC",
  host: "localhost",
  database: "products",
  password: config.dbPassword,
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) {
    throw err;
  }
  done();
});

var endConnect = () => {
  return pool.end();
};

module.exports = { pool, endConnect };
