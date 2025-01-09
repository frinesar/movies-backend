require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user.router");
const wishlistMoviesRouter = require("./routers/wishlistMovies.router");
const watchedMoviesListRouter = require("./routers/watchedMoviesList.router");
const TMDBrouter = require("./routers/TMDB.router");
const errorHandler = require("./middleware/error-handler");
const tokenValidator = require("./middleware/token-validator");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/wishlist", tokenValidator, wishlistMoviesRouter);
app.use("/api/watchedMoviesList", tokenValidator, watchedMoviesListRouter);
app.use("/api/movies", tokenValidator, TMDBrouter);

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Working" });
});

app.use(errorHandler);

module.exports = app;
