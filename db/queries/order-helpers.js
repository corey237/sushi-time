const db = require("../connection");

const getOrdersByUserId = (user) => {
  return db
    .query(`SELECT * FROM orders WHERE user_id = ${user}`)
    .then((data) => {
      return data.rows;
    });
};
module.exports = { getOrdersByUserId };

