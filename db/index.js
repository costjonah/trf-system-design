const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: "localhost", // host.internal.docker
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    done();
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
    console.log("CONNECTED: ", result.rows);
    }
  });
});

module.exports = pool;
