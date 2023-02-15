const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const db = require("../db/connection");
const { getUserByEmail, insertUser } = require("../db/queries/userHelpers");

// const findUserByEmail = function(email) {
//   const sqlQuery = `
//     SELECT * FROM users WHERE email LIKE '$1'
//     `
//     return db.query(sqlQuery, [email])
//       .then((response) => {
//         return response.rows;
//       })

// }

router.get("/", (req, res) => {
  res.render("register.ejs", { error: null });
});

router.post("/", (req, res) => {
  // if (!req.body.email || !req.body.password) {
  //   return res.status(400).send("Invalid Email or Password. Please try again.");
  // }
  console.log(req.body);

  const sqlQuery = `SELECT * FROM users WHERE email = $1`;
  getUserByEmail(req.body.email).then((user) => {
    if (!user) {
      insertUser(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phoneNumber
      ).then((response) => {
        req.session["user_id"] = response["id"];
        res.redirect("/menu");
      });
    } else {
      return res.render("register", { error: "Error: User already exists" });
    }
  });
});
module.exports = router;
