require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user.router");
const wishlistMoviesRouter = require("./routers/wishlist.router");
const reviewRouter = require("./routers/review.router");
const TMDBrouter = require("./routers/TMDB.router");
const errorHandler = require("./middleware/error-handler");
const tokenValidator = require("./middleware/token-validator");

const app = express();
app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//   setTimeout(next, 2000);
// });
app.use("/api/users", userRouter);
app.use("/api/reviews", tokenValidator, reviewRouter);
app.use("/api/wishlist", tokenValidator, wishlistMoviesRouter);
app.use("/api/tmdb", TMDBrouter);

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Working" });
});

app.use(errorHandler);

module.exports = app;
