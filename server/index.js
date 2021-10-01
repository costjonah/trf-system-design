const app = require("./app.js");

let port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
