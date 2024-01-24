const express = require("express");
const { getAllUsers, register, login } = require("./controllers");
const passport = require("passport");

const router = express.Router();
router.get("/users", getAllUsers);
router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

module.exports = router;
