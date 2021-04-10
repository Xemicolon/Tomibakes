const { Schema, model } = require("mongoose");

let ItemSchema = new Schema(
  {
    _id: false,
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    name: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [ItemSchema],
    total: {
      default: 0,
      type: Number,
    },
    totalNoOfProducts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("cart", CartSchema);
