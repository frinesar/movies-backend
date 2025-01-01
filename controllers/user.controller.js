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
    const wishlist = await WishlistService.createWishlist();

    res.status(201).json({ ...userDto });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(
    users.map((user) => {
      return { ...new UserDto(user) };
    })
  );
};
