const db = require("../connection")
const bcrypt = require("bcryptjs");

const getUserByEmail = function(email) {
  const sqlQuery = `SELECT * FROM users WHERE email = $1`
  return db.query(sqlQuery, [email])
    .then((response) => {
       return response.rows[0];
    })
}


const insertUser = function(name, email, password, phoneNumber) {
         const insert = `
        INSERT INTO users (name, email, password, phone_number)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
        return db.query(insert, [
          name, 
          email, 
          bcrypt.hashSync(password, 10), 
          phoneNumber
        ])
        .then((response) => {
          return response.rows[0];
        })
}


const validateEmailAndPassword = function(email, password) {
  getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return false;
      }
      const sqlQuery = `
        SELECT password FROM users WHERE email = $1
      `
      db.query(sqlQuery, [email])
        .then((userPassword) => {
          if (!bcrypt.compareSync(userPassword.rows[0], password)) {
            return false;
          } else {
            return true;
          }
        })
    })
}

const getUserById = function(id) {
  const sqlQuery = `
  SELECT * FROM users WHERE id = $1
  `
  return db.query(sqlQuery, [id])  
    .then((user) => {
      return user.rows[0];
    })
}


module.exports = {getUserByEmail, insertUser, validateEmailAndPassword, getUserById};
