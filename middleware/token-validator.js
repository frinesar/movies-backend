const ApiError = require("../exceptions/api.error");
const TokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.Unauthorized("No logged-in user"));
    }
    return next(ApiError.Unauthorized("No access token provided"));
  }
  if (!TokenService.validateAccessToken(accessToken)) {
    return next(ApiError.Unauthorized("Invalid token"));
  }
  req.userID = TokenService.validateAccessToken(accessToken).id;
  next();
};
