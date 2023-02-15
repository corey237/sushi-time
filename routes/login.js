// Import dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/connection");

// Display the login page
router.get("/", (req, res) => {
  res.render("login");
});

// Process the login form submission
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    console.log(result.rows);
    if (err) {
      throw err;
    }

    // If the user exists, check the password
    if (result.rows.length > 0) {
      const user = result.rows[0];

      bcrypt.compareSync(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }

        if (isMatch) {
          // If the password matches, create a session and redirect to menu
          req.session.user = user;
          res.redirect("/menu");
        } else {
          // If the password does not match, show an error message
          res.render("login", { message: "Invalid username or password" });
        }
      });
    } else {
      // If the user does not exist, show an error message
      res.render("login", { message: "Invalid username or password" });
    }
  });
});

module.exports = router;
