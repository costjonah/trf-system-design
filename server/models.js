const db = require("../db/index.js");

const models = {
  getProducts: (param, callback) => {
    const page = Number(param.page) || 1;
    const count = Number(param.count) || 5;
    const queryStr = `SELECT * FROM list_products LIMIT ${page * count}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET products: ", err);
        callback(err);
      } else {
        console.log("Successful products GET", res.rows);
        callback(null, res.rows);
      }
    });
  },
  getProductInfo: (param, callback) => {
    const productId = Number(param);
    const queryStr = `SELECT * FROM list_products WHERE id=${productId}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET product info: ", err);
        callback(err);
      } else {
        const selected = res.rows;
        const querySubStr = `SELECT feature, value FROM product_information WHERE product_id=${productId}`;
        db.query(querySubStr, (err, res) => {
          if (err) {
            callback(err);
          } else {
            const current = selected[0];
            current.features = res.rows;
            console.log("Successful product info GET", selected);
            callback(null, selected);
          }
        });
      }
    });
  },
  getProductStyles: (param, callback) => {
    const productId = Number(param);
    const queryStr = `SELECT * FROM product_styles WHERE productId=${productId}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET product styles: ", err);
        callback(err);
      } else {
        console.log("Successful product styles GET", res.rows);
        callback(null, res.rows);
      }
    });
  },
  getRelatedProducts: (param, callback) => {
    const productId = Number(param);
    const queryStr = `SELECT * FROM related_products WHERE current_product_id=${productId}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET related products: ", err);
        callback(err);
      } else {
        console.log("Successful related products GET", res.rows);
        callback(null, res.rows);
      }
    });
  },
};

module.exports = models;
