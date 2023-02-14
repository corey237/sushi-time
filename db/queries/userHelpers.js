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

// const sqlQuery = `SELECT * FROM users WHERE email = $1`
//   db.query(sqlQuery, [req.body.email])
//     .then((response) => {
//       if (!response.rows[0]) {
//         const insert = `
//         INSERT INTO users (name, email, password, phone_number)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//         `
//         db.query(insert, [
//           req.body.name, 
//           req.body.email, 
//           bcrypt.hashSync(req.body.password, 10), 
//           req.body.phoneNumber])
//             .then((response) => {
//               req.session['user_id'] = response.rows[0]['id'];
//               res.redirect('/menu');
//             });
//       } else {
//         return res.render('register', {error: 'Error: User already exists'});
//         // return res.status(409).send('Error: User already exists');
//       }
//     })

module.exports = {getUserByEmail, insertUser}
