const models = require("./models.js");

const controllers = {
  productsList: {
    getProducts: (req, res) => {
      const param = req.params;
      models.getProducts(param, (err, data) => {
        if (err) {
          res.status(500).next(err);
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
          res.status(500).next(err);
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
          res.status(500).next(err);
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
          res.status(500).next(err);
        }
        res.send(data);
      });
    },
  },
  shoppingCart: {
    getCart: (req, res) => {
      const param = req.headers.user_session;
      models.getCartInfo(param, (err, data) => {
        if (err) {
          res.status(500).next(err);
        }
        res.send(data);
      });
    },
    postCart: (req, res) => {
      const cartData = {
        user: req.headers.user_session,
        body: req.body,
      };
      models.postToCart(cartData, (err, data) => {
        if (err) {
          res.status(500).next(err);
        }
        res.status(201).send(data);
      });
    },
  },
};

module.exports = controllers;
