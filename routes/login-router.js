const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/menu");
  }
  res.render("login", {
    user: req.session["user_id"]
  });
});

// Handle the login form submission
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  // Find the user in the database by email
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  try {
    const result = await db.query(query);
    const user = result.rows[0];

    if (!user) {
      res.render("login", { user: req.session["user_id"], error: "Invalid email or password." });
      return;
    }

    // Check if the password matches using bcrypt
     const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch', isMatch);
    if (!isMatch) {
      res.render("login", { user: req.session["user_id"], error: "Invalid email or password." });
      return;
    }
    // Set the session cookie to remember the user
    req.session.user_id = user.id;
    res.redirect("menu");
  } catch (err) {
    res.render("login", {
      error: "An error occurred. Please try again later.",
    });
  }
});

module.exports = router;
