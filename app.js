const PORT = 8002;

const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./api/auth/routes");
const morgan = require("morgan");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const app = express();
connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
app.use("/urls", urlRoutes);
app.use(userRoutes);

console.log(__dirname);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8002, () => {
  console.log(`The application is running on localhost${PORT}`);
});
