const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("password-jwt").Strategy;

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
const JWTStrategy = new JWTStrategy({
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secret0rKey: process.env.SECRECT_KEY,
});

module.exports = localStrategy;
