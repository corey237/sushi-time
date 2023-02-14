const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userQueries = require("../db/queries/users");

// GET
router.get("/", (req, res) => {
  if (req.session.user_id) {
    userQueries.getUserById(req.session.userId).then((user) => {
      if (!user.is_admin) {
        return res.redirect("/menu");
      }

      if (user.is_admin) {
        return res.redirect("/orders");
      }
    });
  } else {
    res.render("login");
  }
});

// POST
router.post("/", (req, res) => {
  userQueries
    .getUserByEmail(req.body.email)
    .then((user) => {
      if ((req.body.password, user.password)) {
        req.session.userId = user.id;

        if (!user.is_admin) {
          return res.redirect("/menu");
        }

        if (user.is_admin) {
          return res.redirect("/orders");
        }
      }
    })
    .catch((err) => {
      return res.json({ error: "Wrong email/password combination" });
    });
});

module.exports = router;
