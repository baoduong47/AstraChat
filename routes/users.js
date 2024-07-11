var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", (req, res, next) => {
  res.send("Welcome to the Login Page");
});

router.get("/signup", (req, res, next) => {
  res.send("Welcome to the Sign Up Page");
});
module.exports = router;
