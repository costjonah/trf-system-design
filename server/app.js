const express = require("express");
let app = express();
const router = require("./routes.js");
const db = require("../db/index.js");

app.use(express.json());
app.use(router);

module.exports = app;
