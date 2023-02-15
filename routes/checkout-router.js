const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const { getUserById } = require("../db/queries/userHelpers");

router.get("/", (req, res) => {
  getUserById(req.session["user_id"])
  .then((response) => {
    res.render("checkout", {
      user: req.session["user_id"],
      userInfo: response
    });
  });
});

module.exports = router;