const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPass = async (password) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashPassword = await hashPass(password);
    req.body.password = hashPassword;
    const user = await User.create(req.body);

    const payload = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, proces.env.SECRET_PASS, {
      expiresIn: "4h",
    });
    return res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const payload = {
      _id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, proces.env.SECRET_PASS, {
      expiresIn: "4h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, register, login };
