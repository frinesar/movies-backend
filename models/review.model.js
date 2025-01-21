const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  movieID: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true, default: "" },
  personalRating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

module.exports = model("Review", ReviewSchema, "Reviews");
