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
  return getUserByEmail(email)
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

const getItemsByIds = function(ids) {
  const placeholderClause = ids.map((element, index) => {
    return `$${index + 1}`
  }).join(',')
  const sqlQuery = `
  SELECT *
  FROM items
  WHERE id IN (${placeholderClause})
  `;
  return db.query(sqlQuery, ids)
  .then((result) => {
    return result.rows
  })
} 


const placeOrder = function(total, itemQuantities, userId) {
  const insertOrderQuery = `
  INSERT INTO orders (user_id, total_cost)
  VALUES
  ($1, $2)
  RETURNING id
  `
  let insertOrderItemsQuery = `
  INSERT INTO items_in_order (order_id, item_id, quantity)
  VALUES
  `

  insertOrderItemsQuery += Object.keys(itemQuantities).map((itemId, index) => {
    return `($${(index * 3) + 1}, $${(index * 3) + 2}, $${(index * 3) + 3})`

  }).join(', ')

  console.log('insertItemsOrderQuery Is: ', insertOrderItemsQuery);
  return db.query(insertOrderQuery, [userId, total])
  .then(newOrderResult => {
    const orderId = newOrderResult.rows[0].id;
    const orderItemsQueryValues = Object.keys(itemQuantities).map(itemId => {
      return [orderId, itemId, itemQuantities[itemId]]
    }).flat()
    console.log('orderItemsQueryValues is: ', orderItemsQueryValues);
    return db.query(insertOrderItemsQuery, orderItemsQueryValues);
  })
}

module.exports = {getUserByEmail, insertUser, validateEmailAndPassword, getUserById, getItemsByIds, placeOrder};
