const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [
      {
        aspect_ratio: "16:9",
        width: 512,
        height: 512,
        crop: "fit",
      },
      { quality: "auto:eco", crop: "fit", width: 512, height: 512 },
    ],
    public_id: (req, file) => {
      return file.originalname.split(".")[0];
    },
  },
});
const parser = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    const extension = file.mimetype.split("/")[0];
    if (extension !== "image") {
      return cb("File format must be png, jpg or jpeg", false);
    }
    cb(null, true);
  },
});
const upload = parser.any();

exports.uploadController = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("MulterError:", err);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err && err.code === "ENOTFOUND") {
      return res.status(400).json({
        success: false,
        message: "It seems you are not connected to the internet.",
      });
    }

    if (err) {
      console.log("UnhandledError:", err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    }

    next();
  });
};

exports.deleteImage = async (public_id) => {
  const destroy = await cloudinary.uploader.destroy(public_id, {
    resource_type: "image",
  });

  return destroy;
};
