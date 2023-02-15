const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const { getUserById } = require("../db/queries/userHelpers");


router.get("/", (req, res) => {  
  let userInfo;
  if (!req.session["user_id"]) {
    res.redirect('/login');
  }
  if (req.session["user_id"]) {
    userInfo = getUserById(req.session["user_id"])
      .then((user) => {
        res.render("orders", {
          user: req.session["user_id"],
          userInfo: user
        })
      })
  }
  
  res.redirect("/checkout");
})

module.exports = router;