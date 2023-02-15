const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const db = require("../db/connection");
const { getUserByEmail, insertUser } = require("../db/queries/userHelpers");

router.get("/", (req, res) => {
  res.render("register.ejs", { error: null });
});

router.post("/", (req, res) => {  
  getUserByEmail(req.body.email)
    .then((user) => {
      if (!user) {
        insertUser(req.body.name, req.body.email, req.body.password, req.b ody.phoneNumber)
          .then((response) => {
            req.session['user_id'] = response['id'];
            res.redirect('/menu');
          });
      } else {
        return res.render('register', {error: 'Error: User already exists'});
      }
    })
})
module.exports = router;
