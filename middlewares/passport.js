const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("password-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done({ message: "username or password is wrong" });
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return done({ message: "username or password is wrong" });
      }
      return done(null, user);
    } catch (error) {
      done(err);
    }
  }
);
const JWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secret0rKey: process.env.SECRET_PASS,
  },
  async (payload, done) => {
    try {
      const userId = payload._id;
      const user = await User.findById(userId);
      if (!user) return done({ message: "user not found!" });
      if (Date.now() / 1000 > payload.exp) {
        return done({ message: "token expired!" });
      }
      return done(null, user); // req.user = user
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, JWTStrategy };
