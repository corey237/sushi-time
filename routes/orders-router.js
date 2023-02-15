const express = require("express");
const router = express.Router();
const orderQueries = require("../db/queries/order-helpers");
const userQueries = require("../db/queries/userHelpers");
const db = require("../db/connection");
let orders = [];

router.get("/", async (req, res) => {
  const { user_id } = req.session;

  // Redirect to login page if user is not logged in
  if (!user_id) {
    res.redirect("/login");
    return;
  }

  try {
    const userInfo = await userQueries.getUserById(user_id);

    let isAdmin = await userQueries.isAdmin(user_id);

    let orders = [];

    if (isAdmin) {
      orders = await orderQueries.getAllOrders();
    } else {
      orders = await userQueries.getOrdersByUserId(user_id);
    }

    res.render("orders", { user: user_id, userInfo, orders, isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user information.");
  }
});

module.exports = router;
