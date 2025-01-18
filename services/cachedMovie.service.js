const CachedMovie = require("../models/cachedMovie.model");
const TMDBService = require("./TMDB.service");
const dayjs = require("dayjs");

exports.getMovie = async (movieID) => {
  const cachedMovie = await CachedMovie.findOne({ id: movieID });
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
  const movieCredits = await TMDBService.getCredits(movieID);

  const cast = movieCredits.cast.filter((member) => member.order < 10);
  const director = movieCredits?.crew.filter(
    (member) => member.job === "Director"
  );
  const novel = movieCredits.crew.filter((member) => member.job === "Novel");
  const screenplay = movieCredits?.crew.filter(
    (member) => member.job === "Screenplay"
  );

  return await CachedMovie.findOneAndUpdate(
    { id: movieID },
    {
      ...movieDetails,
      crew: { director, novel, screenplay },
      cast: cast.map((member) => {
        return {
          id: member.id,
          profile_path: member.profile_path,
          name: member.name,
          character: member.character,
        };
      }),
      updatedAt: Date.now(),
    },
    { new: true, upsert: true }
  );
};
