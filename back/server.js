const express = require("express");
var cors = require("cors");
const app = express();
var server = require('http').createServer(app);
const PORT = 8082;
app.use(cors());

app.use("/", function(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.send("Vous êtes à l'accueil");
});

server.listen(PORT, "localhost", function() {
  console.log(
    `Listening on port ${server.address().port}: ${server.address().address}`
  );
});
