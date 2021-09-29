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
};

module.exports = controllers;
