const UserService = require("../services/user.service");
const TokenService = require("../services/token.service");
const WishlistService = require("../services/wishlist.service");
const UserDto = require("../dto/user.dto");
const ApiError = require("../exceptions/api.error");

exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const newUser = await UserService.createUser(username, password);
    const userDto = new UserDto(newUser);
    res.status(201).json(userDto);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    if (req.userID !== id) {
      throw ApiError.Forbidden("No privileges to delete this user");
    }
    const user = await UserService.deleteUser(req.userID);
    await WishlistService.deleteWishlist(req.userID);
    await TokenService.deleteManyRefreshTokens(req.userID);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.loginUser(username, password);
    const payload = { ...new UserDto(user) };
    const { accessToken, refreshToken } = TokenService.createTokens(payload);
    await TokenService.saveRefreshToken(payload.id, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  await TokenService.deleteRefreshToken(refreshToken);
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

exports.refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      return next(ApiError.Unauthorized("No logged-in user"));
    }
    const accessToken = await UserService.refresh(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
