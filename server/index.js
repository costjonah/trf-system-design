const express = require("express");
let app = express();
const router = require("./routes.js");
const db = require("../db/index.js");

app.use(express.json());
app.use(router);

let port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
