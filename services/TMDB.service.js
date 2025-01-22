const ApiError = require("../exceptions/api.error");
const TMDB_API = process.env.TMDB_API;
const TMDB_URL = process.env.TMDB_URL;

exports.getMovie = async (movieID) => {
  return (
    await fetch(`${TMDB_URL}/movie/${movieID}?api_key=${TMDB_API}`)
  ).json();
};

exports.proxyTMDBRequest = async (path, queryParams = {}) => {
  const url = new URL(`${TMDB_URL}/${path}`);
  url.searchParams.append("api_key", TMDB_API);
  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};
