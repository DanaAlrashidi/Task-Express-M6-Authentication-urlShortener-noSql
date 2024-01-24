const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://alwaimry55:cwHwhc907ujwxL1Q@cluster0.wwncd98.mongodb.net/"
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
