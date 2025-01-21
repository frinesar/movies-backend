const CachedMovie = require("../models/cachedMovie.model");
const TMDBService = require("./TMDB.service");
const dayjs = require("dayjs");

exports.getMovie = async (movieID) => {
  const cachedMovie = await CachedMovie.findOne({ id: movieID }).lean();
  if (!cachedMovie) {
    return await addMovie(movieID);
  }
  if (cachedMovie) {
    const lastUpdated = dayjs(cachedMovie.updatedAt);
    if (Math.abs(lastUpdated.diff(dayjs(), "day")) > 7) {
      return await addMovie(movieID);
    }
  }
  return cachedMovie;
};

const addMovie = async (movieID) => {
  const movieDetails = await TMDBService.getMovie(movieID);

  return await CachedMovie.findOneAndUpdate(
    { id: movieID },
    {
      ...movieDetails,
      updatedAt: Date.now(),
    },
    { new: true, upsert: true, lean: true }
  );
};
