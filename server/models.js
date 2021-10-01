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
    const resultObj = {
      product_id: param,
      results: [],
    };
    let processed = 0;
    const queryStr = `SELECT * FROM product_styles WHERE productId=${productId}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET product styles: ", err);
        callback(err);
      } else {
        res.rows.forEach((x, indexX) => {
          resultObj.results.push(x);
        });
        res.rows.forEach((y, indexY) => {
          const photosQuery = `SELECT thumbnail_url, url FROM photos WHERE styleId=${y.id}`;
          db.query(photosQuery, (err, res) => {
            resultObj.results[indexY].photos = res.rows[indexY];
            if (err) {
              console.log("Failed to GET photos: ", err);
              callback(err);
            } else {
              const skusQuery = `SELECT * FROM skus WHERE styleId=${y.id}`;
              db.query(skusQuery, (err, res) => {
                if (err) {
                  console.log("Failed to GET skus: ", err);
                  callback(err);
                } else {
                  resultObj.results[indexY].skus = {};
                  res.rows.forEach((z, indexZ) => {
                    resultObj.results[indexY].skus[z.id] = {
                      quantity: z.quantity,
                      size: z.size,
                    };
                  });
                  processed++;
                  if (processed === resultObj.results.length) {
                    callback(null, resultObj);
                  }
                }
              });
            }
          });
        });
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
  getCartInfo: (param, callback) => {
    const userId = Number(param);
    const cartMeta = [];
    const cartItems = [];
    const queryStr = `SELECT * FROM cart WHERE user_session=${userId}`;
    db.query(queryStr, (err, res) => {
      if (err) {
        console.log("Failed to GET from cart", err);
        callback(err);
      } else {
        cartMeta.push(res.rows);
        const querySubStr = `SELECT sku_id, count FROM current_items WHERE user_session=${userId}`;
        db.query(querySubStr, (err, res) => {
          if (err) {
            console.log("Failed to GET from cart current items", err);
            callback(err);
          } else {
            cartItems.push(res.rows);
            console.log("Successful GET from cart");
            callback(null, {
              cartMeta: cartMeta,
              cartItems: cartItems,
            });
          }
        });
      }
    });
  },
  postToCart: (cartData, callback) => {
    const idQueryStr = "SELECT MAX(id) FROM cart";
    db.query(idQueryStr, (err, res) => {
      if (err) {
        console.log("Failed to POST to cart", err);
        callback(err);
      } else {
        const currentId = res.rows[0].max;
        const queryStr =
          "INSERT INTO cart (id, user_session, product_id, active) VALUES ($1, $2, $3, $4)";
        const queryArr = [
          currentId + 1,
          Number(cartData.user),
          Number(cartData.body.product_id),
          1,
        ];
        db.query(queryStr, queryArr, (err, res) => {
          if (err) {
            console.log("Failed to POST to cart", err);
            callback(err);
          } else {
            const querySubStr =
              "INSERT INTO current_items (sku_id, count, user_session) VALUES ($1, $2, $3)";
            const querySubArr = [
              Number(cartData.body.sku_id),
              Number(cartData.body.count),
              Number(cartData.user),
            ];
            db.query(querySubStr, querySubArr, (err, res) => {
              if (err) {
                console.log("Failed to POST to current items", err);
                callback(err);
              } else {
                console.log("Successful POST", res);
                callback(null, res);
              }
            });
          }
        });
      }
    });
  },
};

module.exports = models;
