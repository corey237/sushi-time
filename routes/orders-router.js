const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/order-helpers");
const db = require("../db/connection");

router.get("/", async (req, res) => {
  const user_id = req.session.userId;

  // Redirect to login page if user is not logged in
  if (!user_id) {
    res.redirect("/login");
    return;
  }

  // Get the orders for the current user
  const orders = await userQueries.getOrdersByUserId(user_id);

  // Render the orders template with the orders data
  res.render("orders.ejs", { orders });
});

module.exports = router;
