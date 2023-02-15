const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/order-helpers");
const { getUserById } = require("../db/queries/userHelpers");
const db = require("../db/connection");

router.get("/", async (req, res) => {
  const user_id = req.session["user_id"];

  // Redirect to login page if user is not logged in
  if (!user_id) {
    res.redirect("/login");
    return;
  }

  // Get the orders for the current user
  const orders = await userQueries.getOrdersByUserId(user_id);

  // Render the orders template with the orders data

  getUserById(req.session["user_id"]).then((response) => {
    res.render("orders", {
      user: req.session["user_id"],
      userInfo: response,
      orders,
    });
  });
});

module.exports = router;
