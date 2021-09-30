const models = require("./models.js");

const controllers = {
  productsList: {
    getProducts: (req, res) => {
      const params = req.params;
      models.getProducts(params, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
    },
  },
  productInfo: {
    getProductInfo: (req, res) => {
      const paramId = req.params.product_id;
      models.getProductInfo(paramId, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
    },
  },
  productStyles: {
    getProductStyles: (req, res) => {
      const paramId = req.params.product_id;
      models.getProductStyles(paramId, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
    },
  },
  relatedProducts: {
    getRelatedProducts: (req, res) => {
      const paramId = req.params.product_id;
      models.getRelatedProducts(paramId, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
    },
  },
  shoppingCart: {
    getCart: (req, res) => {
      console.log("GETCART: ", req.params);
      res.send(req.params);
    },
    postToCart: (req, res) => {
      console.log("POSTCART: ", req.body);
      res.status(201).send(req.body);
    },
  },
};

module.exports = controllers;
