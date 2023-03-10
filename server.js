// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8080;
const app = express();
const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

app.set("view engine", "ejs");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "Session",
    keys: ["This is my secret key. Dont tell anyone."],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const logoutRouter = require("./routes/logout-router");
const { getUserById, getItems } = require("./db/queries/userHelpers");
const ordersRouter = require("./routes/orders-router");
const menuRouter = require("./routes/menu-router");
const checkoutRouter = require("./routes/checkout-router");
const itemsRouter = require("./routes/items-router")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/widgets", widgetApiRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/orders", ordersRouter);
app.use("/menu", menuRouter);
app.use("/checkout", checkoutRouter);
app.use("/items", itemsRouter)

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  if (req.session["user_id"]) {
    getUserById(req.session["user_id"]).then((response) => {
      console.log(response);
      if (response) {
        res.render("index", {
          user: req.session["user_id"],
          userInfo: response,
        });
      } else {
        res.render("index", {
          user: null,
          userInfo: null,
        });
      }
    });
  } else {
    //Error handling
    res.render("index", {
      user: null,
      userInfo: null,
    });
  }
});

//click 'Sushi Time' on nav to go back to home page
app.get("/index", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
