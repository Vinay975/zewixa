const crypto = require("crypto");
const cloudinary = require("../config/cloudinary");
const ImageCache = require("../models/imageCache.model");

const uploadImageWithCache = async (file, folder) => {
  const fileHash = crypto.createHash("md5").update(file.buffer).digest("hex");

  // Check cache first
  let cachedImage = await ImageCache.findOne({ hash: fileHash });

  if (cachedImage) {
    console.log(`✅ Using cached image: ${fileHash}`);
    return cachedImage.cloudinaryUrl;
  }

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    { folder }
  );

  // Save to cache
  await new ImageCache({
    hash: fileHash,
    cloudinaryUrl: result.secure_url,
    folder,
  }).save();

  console.log(`✅ Uploaded new image to Cloudinary: ${result.secure_url}`);
  return result.secure_url;
};

module.exports = { uploadImageWithCache };
