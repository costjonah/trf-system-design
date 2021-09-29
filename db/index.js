const pg = require("pg");
const config = require('../config.js');
connectStr = `postgres://JonahC:${config.dbPassword}@localhost:5432/products`;


const pool = new pg.Pool({
  connectStr,
});

const client = new pg.Client({
  connectStr,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});

module.exports = { client, pool };
