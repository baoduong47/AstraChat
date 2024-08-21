const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/google", (req, res, next) => {
  const state = req.query.action;
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: state,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      console.log("No user returned from Google authentication");
      return res.redirect("http://localhost:3001/login");
    }

    console.log("req.user", req.user);

    const action = req.query.state;
    console.log("Action:", action);

    if (action === "signup") {
      return res.redirect("http://localhost:3001/login");
    } else {
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "7h",
      });
      res.redirect(`http://localhost:3001/login?token=${token}`);
    }
  }
);

module.exports = router;
