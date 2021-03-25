const { deleteImage } = require("../utils/index");

exports.uploadImages = async (req, res, next) => {
  const image = req.files;

  if (!image || image.length === 0) {
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
  console.log(req.query.publicId);
  if (!req.query.publicId) {
    return res.status(400).json({
      success: false,
      message: "Please enter public id of image to delete",
    });
  }

  const image = await deleteImage(req.query.publicId);
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
