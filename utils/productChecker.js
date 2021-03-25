exports.productInputValidator = (
  res,
  name,
  description,
  category,
  price,
  quantity,
  image
) => {
  if (!name || !description || !category || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: "One or more fields are missing!",
    });
  }

  if (!image) {
    return res.status(400).json({
      success: false,
      message: "You must upload an image for this product!",
    });
  }

  if (typeof price !== Number) {
    return res.status(400).json({
      success: false,
      message: "Product price must be a number or integer!",
    });
  }
};
