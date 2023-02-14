const db = require('../connection');

const getOrdersById = () => {
  return db.query('SELECT * FROM ORDERS WHERE ')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
