const db = require("../db/index.js");

const models = {
  getAllProducts: (callback) => {
    const queryStr = "SELECT * FROM list_products LIMIT 10";
    db.query(queryStr, (err, rows) => {
      if (err) {
        console.log("Failed to GET products: ", err);
        throw err;
      } else {
        console.log("Successful products GET", rows);
        callback(null, rows);
      }
    });
  },
};

module.exports = models;
