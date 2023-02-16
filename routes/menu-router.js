const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { getUserById } = require("../db/queries/userHelpers");



router.get("/", (req, res) => {
  if (!req.session["user_id"]) {
    res.redirect("login");
  }
  getUserById(req.session["user_id"]).then((response) => {
    res.render("menu", {
      user: req.session["user_id"],
      userInfo: response,
    });
  });
});

module.exports = router;
