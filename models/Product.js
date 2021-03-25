const { Schema, model } = require("mongoose");
const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: Array, required: true },
    brand: { type: String, required: false },
    category: { type: Array, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    rating: { type: Number, required: false },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = model("Product", ProductSchema);
