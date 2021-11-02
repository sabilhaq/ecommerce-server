const { Schema, model } = require("mongoose");

const reviewSchema = Schema(
  {
    message: String,
    rate: Number,
    UserId: String,
    ProductId: Number,
  },
  { timestamps: true },
);

module.exports = model("Review", reviewSchema);
