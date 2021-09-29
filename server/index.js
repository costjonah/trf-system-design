const express = require("express");
let app = express();
const controllers = require("./controllers.js");
const db = require("../db/index.js");

app.use(express.json());

let port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/products", controllers.productsList.getProducts);
app.get("/products/:product_id", controllers.productInfo.getProductInfo);
app.get(
  "/products/:product_id/styles",
  controllers.productStyles.getProductStyles
);
app.get(
  "/products/:product_id/related",
  controllers.relatedProducts.getRelatedProducts
);

module.exports = app;
