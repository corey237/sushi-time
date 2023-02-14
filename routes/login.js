const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
  userQueries
    .getUserByEmail(req.body.email)
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
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
