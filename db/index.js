const pg = require("pg");
const config = require("../config.js");
// connectStr = `postgres://JonahC:${config.dbPassword}@localhost:5432/products`;

const pool = new pg.Pool({
  user: "JonahC",
  host: "localhost",
  database: "products",
  password: config.dbPassword,
  port: 5432,
});

// const client = new pg.Client({
//   connectStr,
// });

// client.connect();
pool.connect();

module.exports = pool;
