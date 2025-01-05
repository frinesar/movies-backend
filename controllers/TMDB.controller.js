const ApiError = require("../exceptions/api.error");

exports.findMovie = async (req, res, next) => {
  const { query } = req.params;

  try {
    const response = await fetch(
      `${process.env.TMDB_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API}`
    );
    const resu = await response.json();
    res.status(200).json({ ...resu });
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
