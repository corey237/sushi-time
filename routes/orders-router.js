const express = require("express");
const router = express.Router();
const orderQueries = require("../db/queries/order-helpers");
const userQueries = require("../db/queries/userHelpers");

// GET /orders
router.get("/", async (req, res) => {
  const { user_id } = req.session;

  // Redirect to login page if user is not logged in
  if (!user_id) {
    res.redirect("/login");
    return;
  }

  try {
    // Get user information from the database
    const userInfo = await userQueries.getUserById(user_id);

    // Check if the current user is an admin
    let isAdmin = await userQueries.isAdmin(user_id);

    let orders = [];

    // If the current user is an admin, get all orders from the db
    if (isAdmin) {
      orders = await orderQueries.getAllOrders();

      // If not, get the orders associated with the user ID
    } else {
      orders = await orderQueries.getOrdersByUserId(user_id);
    }

    // Render the orders page with the orders and user information
    res.render("orders", { user: user_id, userInfo, orders, isAdmin });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// POST orders/complete
router.post("/complete", async (req, res) => {
  const orderId = req.body.orderId;

  try {
    // Get the order information from the db
    const order = await orderQueries.getOrderById(orderId);
    console.log("order:", order);

    // Mark the order as complete in the db
    await orderQueries.markOrderComplete(orderId);

    // Get the user information associated with the order
    const user = await userQueries.getUserById(order.user_id);

    // Send a order complete sms to the user
    const message = `Order #${order.id} for ${user.name} is now completed. Thank you for ordering!`;
    orderQueries.sendSMS(user.phone_number, message);

    // Redirect to the orders page
    res.redirect("/orders");
  } catch (error) {
    console.error(error.message);
    console.error(error);

    // If an error occurs, return an error message
    res
      .status(500)
      .send(`Error marking order ${orderId} as complete: ${error.message}`);
  }
});

// POST orders/estimated
router.post("/estimated", async (req, res) => {
  const orderId = req.body.orderId;
  const estimatedPreparationTime = req.body.estimatedPreparationTime;

  try {
    // Update the order in the db with the estimated preparation time
    await orderQueries.updateOrderEstimatedTime(
      orderId,
      estimatedPreparationTime
    );

    // Get the user information associated with the order
    const order = await orderQueries.getOrderById(orderId);
    const user = await userQueries.getUserById(order.user_id);

    // Send a confirmation sms to the user
    const message = `Thank you for your order #${order.id}! The estimated preparation time is ${estimatedPreparationTime} minutes. We'll let you know when it's ready.`;
    orderQueries.sendSMS(user.phone_number, message);

    // Redirect to the orders page
    res.redirect(`/orders/`);
  } catch (error) {
    console.error(error.message);
    console.error(error);

    // If an error occurs, return an error message
    res
      .status(500)
      .send(
        `Error updating order ${orderId} with estimated preparation time: ${error.message}`
      );
  }
});
module.exports = router;
