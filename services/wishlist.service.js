const Wishlist = require("../models/wishlist.model");

exports.createWishlist = async () => {
  const wishlist = await Wishlist.create();
  return wishlist;
};
