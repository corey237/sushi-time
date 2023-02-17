const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const db = require("../db/connection");
const { getUserByEmail, insertUser } = require("../db/queries/userHelpers");


router.get("/", (req, res) => {
  if (req.session["user_id"]) {
    res.redirect("menu")
  }
  res.render("register", { error: null, user: req.session["user_id"] });
});

router.post("/", (req, res) => {
  getUserByEmail(req.body.email)
    .then((user) => {
      console.log(user);
      if (!user) {
        insertUser(req.body.name, req.body.email, req.body.password, req.body.phone)
          .then((response) => {
            req.session['user_id'] = response['id'];
            res.redirect('menu');
          });
      } else {
        return res.render('register', {error: 'Error: User already exists', user: null});
      }
    })
})
module.exports = router;
