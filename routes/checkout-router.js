const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const {
  getUserById,
  getItemsByIds,
  placeOrder,
} = require("../db/queries/userHelpers");
const orderQueries = require("../db/queries/order-helpers");

router.get("/", (req, res) => {
  getUserById(req.session["user_id"]).then((response) => {
    res.render("checkout", {
      user: req.session["user_id"],
      userInfo: response,
    });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const ids = Object.keys(req.body);
  getItemsByIds(ids).then((items) => {
    let total = 0;
    for (const item of items) {
      total += item.price * req.body[item.id];
    }
    placeOrder(total, req.body, req.session["user_id"]).then((orderId) => {
      // Send SMS notification to restaurant
      const orderDetails = `Order #${orderId}: ${JSON.stringify(req.body)}`;
      orderQueries.sendSMS("16479846313", orderDetails);
      res.redirect("orders");
    });
  });
});

module.exports = router;
