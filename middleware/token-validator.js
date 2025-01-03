const ApiError = require("../exceptions/api.error");

module.exports = (req, res, next) => {
  req.userID = "67781503c0d383c0ba82af10";
  next();
};
