const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal import
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/Common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Database connection success"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// pase cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// 404 not found
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

// app lister
app.listen(process.env.PORT, () => {
  console.log(`App is Listening on port ${process.env.PORT} `);
});
