const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      console.log("No user returned from Google authentication");
      return res.redirect("http://localhost:3001/login");
    }

    console.log("req.user", req.user);

    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.redirect(`http://localhost:3001/login?token=${token}`);
  }
);

module.exports = router;
