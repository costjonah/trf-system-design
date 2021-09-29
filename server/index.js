const express = require("express");
let app = express();
const db = require("../db/index.js");

app.use(express.json());

let port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send();
});
