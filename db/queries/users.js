const db = require("../connection");
const bcrypt = require("bcryptjs");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserByEmail = (email, db) => {
  return db
    .query(`SELECT * FROM users WHERE email = ${email};`, [email])
    .then((data) => {
      return data.rows[0];
    });
};


module.exports = { getUsers, getUserByEmail };
