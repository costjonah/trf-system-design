var express = require("express");
var router = express.Router();
const controllers = require("./controllers.js");

router.get("/products", controllers.productsList.getProducts);

router.get("/products/:product_id", controllers.productInfo.getProductInfo);

router.get(
  "/products/:product_id/styles",
  controllers.productStyles.getProductStyles
);

router.get(
  "/products/:product_id/related",
  controllers.relatedProducts.getRelatedProducts
);

module.exports = router;
