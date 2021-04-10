const { Schema, model } = require("mongoose");
// const reviewSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     comment: { type: String, required: true },
//     rating: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );
const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: Array, required: true },
    description: { type: String, required: true },
    size: {
      type: String,
      enum: ["6in", "8in", "10in", "12in"],
      default: "6in",
    },
    flavor: { type: String, required: true },
    frosting: { type: String, required: true },
    price: { type: Number, required: true },
    // reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = model("Product", ProductSchema);
