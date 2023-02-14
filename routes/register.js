// Import dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/connection");

// Display the registration page
router.get("/", (req, res) => {
  res.render("register");
});

// Process the registration form submission
router.post("/", (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if the name, email, or phone number is already taken
  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    console.log(res.rows);
    if (err) {
      throw err;
    }

    if (result.rows.length > 0) {
      res.render("register", {
        message: "name, email, or phone number already taken",
      });
    } else {
      // If the name, email, and phone number are available, hash the password and store the user in the database
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw err;
        }

        db.query(
          "INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4);",
          [name, email, phone, hash],
          (err, result) => {
            if (err) {
              throw err;
            }

            res.redirect("/login");
          }
        );
      });
    }
  });
});

module.exports = router;
