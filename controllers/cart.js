const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { decodeJWT } = require("../utils");

exports.addToCart = async (req, res, next) => {
  const { productId, quantity, flavor } = req.body;
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  if (!req.headers["x-access-token"]) {
    return res.status(401).json({
      success: false,
      message: "You need to be logged in to add products to cart!",
    });
  }

  try {
    const product = await Product.findById(productId);

    const decryptuser = decodeJWT(req.headers["x-access-token"]);
    const user = await User.findById(decryptuser.userID);
    const cart = await Cart.findOne({ userId: user._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist!",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (!cart) {
      const item = {
        name: product.name,
        image: product.image[0].imgurl,
        flavor: product.flavor,
        productId: product._id,
        quantity: quantity,
        price: product.price,
        subTotal: quantity * product.price,
      };

      const newCart = new Cart({
        userId: user._id,
        items: [item],
        total: item.subTotal,
        totalNoOfProducts: item.quantity,
      });
      newCart.items[0].cartId = newCart._id;

      await newCart.save();

      return res.status(200).json({
        success: true,
        message: "Item has been added to cart",
        cart: newCart,
      });
    }

    let itemIndex = cart.items.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      let productItem = cart.items[itemIndex];
      productItem.quantity = quantity;
      productItem.subTotal = quantity * product.price;
      cart.items[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.items.push({
        name: product.name,
        cartId: cart._id,
        flavor: product.flavor,
        image: product.image[0].imgurl,
        productId: product._id,
        quantity: quantity,
        price: product.price,
        subTotal: quantity * product.price,
      });
    }

    cart.total = cart.items
      .map((product) => product.subTotal)
      .reduce((acc, next) => acc + next);

    cart.totalNoOfProducts = cart.items
      .map((product) => product.quantity)
      .reduce((acc, next) => acc + next);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item has been added to cart",
      cart: cart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong. Please try again or contact administrator for help",
    });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const decryptuser = decodeJWT(req.headers["x-access-token"]);
    const user = await User.findById(decryptuser.userID);

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User or cart does not exist for this user",
      });
    }

    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      return res.status(400).json({
        success: true,
        message: "You don'\t have a shopping cart yet",
      });
    }

    if (cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your shopping cart is empty",
        cart: cart,
      });
    }

    return res.status(200).json({
      success: true,
      cart: cart,
      user: user.email,
    });
  } catch (err) {
    console.log(err);
    // if (err.kind) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "CartId is incorrect!",
    //   });
    // }
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please contact admin.",
    });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart has been deleted or does not exist for this user",
      });
    }

    const user = await User.findById(cart.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (user && cart) {
      Cart.findByIdAndDelete(cart._id, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Cart successfully deleted",
          cart: result._id,
        });
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

exports.deleteItemFromCart = async (req, res, next) => {
  const { cartId } = req.body;
  const cartExists = await Cart.findById(cartId);

  if (!cartExists) {
    return res.status(404).json({
      success: false,
      message: "Cart has been deleted or does not exist for this user",
    });
  }

  const user = await User.findById(cartExists.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }

  try {
    if (user) {
      if (cartExists.items.length === 1) {
        cartExists.items[0].productId.toString() === req.params.productId
          ? (cartExists.items = [])
          : cartExists.items[0];
        cartExists.totalNoOfProducts = 0;
        cartExists.total = 0;

        await cartExists.save();

        return res.status(200).json({
          success: true,
          message: "Item has been removed from your cart",
          cart: cartExists,
        });
      }

      if (cartExists.items.length > 1) {
        cartExists.items = cartExists.items.filter(
          (item) => item.productId.toString() !== req.params.productId
        );

        cartExists.totalNoOfProducts = cartExists.items
          .map((p) => p.quantity)
          .reduce((acc, next) => acc + next);

        cartExists.total = cartExists.items
          .map((p) => p.subTotal)
          .reduce((acc, next) => acc + next);
        await cartExists.save();

        return res.status(200).json({
          success: true,
          message: "Item has been removed from your cart",
          cart: cartExists,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
};
