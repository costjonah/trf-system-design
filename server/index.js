const app = require("./app.js");
const http = require("http");

let port = 8080 || process.env.PORT;

let httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
