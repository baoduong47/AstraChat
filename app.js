const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Load environment variables from .env file
dotenv.config();

const app = express();

// MongoDB connection string(from .env)
const MongoURI = process.env.MONGO_URI;

mongoose
  .connect(MongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas!");

    const User = require("./models/user");
    const testUser = new User({
      firstname: "brandon2",
      lastname: "duong",
      email: "bduong14972@gmail.com",
    });

    testUser
      .save()
      .then(() => {
        console.log("Test user saved successfully!");
      })
      .catch((error) => console.log("Error saving test user: ", error));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas", error);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
