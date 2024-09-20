const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const commentRouter = require("./routes/commentRouter");
const messageRouter = require("./routes/messageRouter");
const notificationRouter = require("./routes/notificationRouter");
const authRouter = require("./routes/authRouter");

// Load environment variables from .env file
dotenv.config();

require("./config/passport");

const app = express();

// MongoDB connection string(from .env)
const MongoURI = process.env.MONGO_URI;

const connect = mongoose.connect(MongoURI, {});

connect
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(cors({ origin: "wisteria-912.netlify.app" }));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentRouter);
app.use("/messages", messageRouter);
app.use("/notifications", notificationRouter);
app.use("/auth", authRouter);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
