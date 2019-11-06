// to start a web server
const express = require("express");
const app = express();
// create the server by the node's HTTP servers to handle requests
var server = require("http").createServer(app);
const PORT = 8082;

const bodyParser = require("body-parser");
const formRoutes = require("./api/form/index");

//support parsing of application/json type post data
app.use(bodyParser.json());

////support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", formRoutes);

// Starts the http server listening for connection
server.listen(PORT, "localhost", function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log(
      `🌎  Listening at http://${server.address().address}:${server.address().port}`
    );
  }
});
