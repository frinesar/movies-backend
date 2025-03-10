const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  showname: { type: String },
  password: { type: String, required: true },
});

module.exports = model("User", UserSchema, "Users");
