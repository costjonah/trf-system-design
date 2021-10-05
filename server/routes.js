const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");

router.get("/", (req, res) => {
  res.redirect("/products");
});

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

router.get("/cart", controllers.shoppingCart.getCart);

router.post("/cart", controllers.shoppingCart.postCart);

module.exports = router;
