const db = require("../connection");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const getOrdersByUserId = (user) => {
  return db
    .query(`SELECT * FROM orders WHERE user_id = ${user}`)
    .then((data) => {
      return data.rows;
    });
};

const getAllOrders = (user) => {
  return db.query(`SELECT * FROM orders `).then((data) => {
    return data.rows;
  });
};

const markOrderComplete = (orderId) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE orders SET is_completed = TRUE, time_completed = NOW() WHERE id = $1";
    db.query(query, [orderId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rowCount);
      }
    });
  });
};

const sendSMS = (phoneNumber, message) => {
  const client = twilio(accountSid, authToken);

  phoneNumber = "+" + phoneNumber;

  client.messages
    .create({
      body: message,
      from: "+12245041906",
      to: phoneNumber,
    })
    .then((message) => console.log(`SMS sent: ${message.sid}`))
    .catch((error) => console.error(`Error sending SMS: ${error.message}`));
};

const getOrderById = (orderId) => {
  return db
    .query(`SELECT * FROM orders WHERE id = $1`, [orderId])
    .then((data) => {
      return data.rows[0];
    });
};

const updateOrderEstimatedTime = (orderId, estimatedTime) => {
  const query = {
    text: `
      UPDATE orders
      SET time_estimated = $1
      WHERE id = $2
      RETURNING *
    `,
    values: [estimatedTime, orderId],
  };

  return db.query(query).then((result) => result.rows[0]);
};

module.exports = {
  getOrdersByUserId,
  getAllOrders,
  markOrderComplete,
  sendSMS,
  getOrderById,
  updateOrderEstimatedTime,
};
