// to require at the connection of databases
const connection = require("../../connection/db");
const express = require("express");

// create modular road manager and stock in a variable
const formRoutes = express.Router();

// define the method and path to recover all contact in the database with the connection.query function
formRoutes.get("/contacts", (req, res) => {
  // SQL request
  connection.query(`SELECT * FROM contact`, async (err, results) => {
    if (err) {
      // Send a response 500 at the front when the request failed
      res.status(500).send("Error with sell parts recuperation");
    } else {
      //Send a response in JSON format forward if the request is successful
      res.json(results);
    }
  });
});

// define the method and path to post the new contact in the database with the connection.query function
formRoutes.post("/add-new-contact", function(req, res) {
  // new variables to take each request that has succeeded the condition
  let firstname;
  let lastName;
  let phone;

  // if the request doesn't success nothing to send at the database
  if (req.body.contact.firstname !== "") {
    firstname = req.body.contact.firstname;
  }
  if (req.body.contact.lastName !== "") {
    lastName = req.body.contact.lastName;
  }
  if (req.body.contact.phone.match(/^((\+)39[ ]02[ ])[1-9]{7}$/)) {
    phone = req.body.contact.phone;
  } else {
    res.status(500);
  }
  connection.query(
    `INSERT INTO contact(firstname, last_name, phone) VALUES ("${firstname}", "${lastName}", "${phone}")`,
    async function(err, results) {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          server: "Failure, something is wrong with the request"
        });
      } else {
        res.status(200).json({
          server: "Success"
        });
      }
    }
  );
});

// define the method and path to update the contact in the database with the connection.query function
formRoutes.put("/edit-contact", function(req, res) {
  let requestBody = [];
  if (req.body.contact.firstname !== "") {
    requestBody.push(`firstname="${req.body.contact.firstname}"`);
  }
  if (req.body.contact.lastName !== "") {
    requestBody.push(`last_name="${req.body.contact.lastName}"`);
  }
  if (
    req.body.contact.phone.match(/^((\+)39[ ]02[ ])[1-9]{7}$/) ||
    req.body.contact.phone !== ""
  ) {
    requestBody.push(`phone="${req.body.contact.phone}"`);
  }

  // to convert array to string and return the results
  connection.query(
    `UPDATE contact SET ${requestBody.toString()} WHERE contact_id=${
      req.body.contact_id
    }`,
    async function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({
          server: "Failure, something is wrong with the request"
        });
      } else {
        res.status(200).json({
          server: "Success"
        });
      }
    }
  );
});

module.exports = formRoutes;
