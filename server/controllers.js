const models = require("./models.js");

const controllers = {
  productsList: {
    getAll: (req, res) => {
      models.getAllProducts((err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
    },
  },
};

module.exports = controllers;
