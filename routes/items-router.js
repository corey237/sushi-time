const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const {
  getUserById,
  getItemsByIds,
  placeOrder,
} = require("../db/queries/userHelpers");
const db = require("../db/connection");


//Used for items query on /checkout page

router.get("/", (req, res) => {
  if (!req.session["user_id"]) {
    res.statusCode(403).send("Permission denied. Please sign in.");
  }
  const sqlQuery = `SELECT * FROM items;`;
  db.query(sqlQuery).then((items) => {
    res.json(items.rows);
  });
});
module.exports = router;
