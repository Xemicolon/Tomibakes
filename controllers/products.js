const Product = require("../models/Product");
const { deleteImage } = require("../utils/fileUpload");

exports.addProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    image,
    inStock,
    brand,
  } = req.body;

  if (!name || !description || !category || !price) {
    return res.status(400).json({
      success: false,
      message: "One or more fields are missing!",
    });
  }

  if (!image) {
    return res.status(400).json({
      success: true,
      message: "You must upload at least one image",
    });
  }

  const productInfo = {
    name,
    description,
    category,
    price,
    inStock,
    brand,
  };

  let newProduct = new Product(productInfo);
  newProduct.image = image;

  newProduct.category = category;

  newProduct.save();

  return res.status(200).json({
    success: true,
    message: "Product has been added",
    product: newProduct,
  });
};

exports.updateProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    image,
    inStock,
    brand,
  } = req.body;
  try {
    const product = await Product.findById(req.params.productId);
    product.name = name;
    product.description = description;
    product.category = category;
    if (image) {
      product.image = image;
    }
    product.price = price;
    product.inStock = inStock;
    product.brand = brand;

    product.save();

    res.status(200).json({
      success: true,
      message: "Updated product successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.productId });
    res.status(200).json({
      success: true,
      message: "Product successfully deleted.",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message:
        "This product doesn't exist, product ID is not correct, or has been deleted!",
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    let product = await Product.findOne({ _id: productId });

    if (product === null) {
      return res.status(404).json({
        success: false,
        message: "This product doesn't exist or has been deleted!",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message:
        "This product doesn't exist, product ID is not correct, or has been deleted!",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  let pages = 1;
  let page = parseInt(req.query.page) || 1;
  let productPerPage = 9;

  let productCount = await Product.estimatedDocumentCount({}).exec();
  if (productCount === 0) {
    return res.status(400).json({
      success: false,
      message: "No products in your store. Get started by adding some!",
    });
  }

  await Product.find({})
    .skip(productPerPage * (page - 1))
    .limit(productPerPage)
    .exec((err, products) => {
      pages = Math.ceil(productCount / productPerPage);

      if (pages === 1) {
        res.status(200).json({
          success: true,
          next: "",
          currentPage: page,
          prev: "",
          totalProductCount: productCount,
          pages: pages,
          products: products,
        });
        return;
      }

      if (page === pages) {
        res.status(200).json({
          success: true,
          next: "",
          currentPage: page,
          prev: `http://localhost:3001/products?page=${page - 1}`,
          totalProductCount: productCount,
          pages: pages,
          products: products,
        });
        return;
      }

      if (pages > 0 && page <= pages) {
        res.status(200).json({
          success: true,
          next: `http://localhost:3001/products?page=${page + 1}`,
          currentPage: page,
          prev:
            page === 1 ? "" : `http://localhost:3001/products?page=${page - 1}`,
          totalProductCount: productCount,
          pages: pages,
          products: products,
        });
        return;
      }
    });
};

exports.uploadImages = async (req, res) => {
  const image = req.files;
  if (!image) {
    return res.status(400).json({
      success: false,
      message: "You must upload at least one image",
    });
  }
  return res.status(201).json({
    success: true,
    message: "File uploded successfully",
    image: image,
  });
};

exports.deleteImages = async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    return res.status(400).json({
      success: false,
      message: "Please enter public id of image to delete",
    });
  }

  const image = await deleteImage(publicId);
  if (image.result === "ok") {
    res.status(200).json({
      success: true,
      message: "Image has been deleted!",
    });
  }

  if (image.result === "not found") {
    res.status(404).json({
      success: false,
      message: "Image doesn't exist or has been deleted!",
    });
  }
};
