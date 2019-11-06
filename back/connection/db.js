// To import
const mysql = require("mysql");
require("dotenv").config();

// To configure the connection
const connection = mysql.createConnection({
  host: process.env.SQL_HOST, //completer avec vos infos dans .env
  port: process.env.SQL_PORT, //completer avec vos infos dans .env
  user: process.env.SQL_USER, //completer avec vos infos dans .env
  password: process.env.SQL_PASSWORD, //completer avec vos infos dans .env
  database: process.env.SQL_DATABASE //completer avec vos infos dans .env
});


//To see if the connection was made with the database 
connection.connect(function(err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  } else {
    console.log("Connected as thread id: " + connection.threadId);
  }
});

// To export
module.exports = connection;
