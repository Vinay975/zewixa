const crypto = require("crypto");
const cloudinary = require("../cloudinaryConfig");
const ImageCache = require("../image/imageCacheModel");

const uploadImageWithCache = async (file, folder) => {
  const fileHash = crypto.createHash("md5").update(file.buffer).digest("hex");

  // Check cache first
  let cachedImage = await ImageCache.findOne({ hash: fileHash });

  if (cachedImage) {
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

  return result.secure_url;
};

module.exports = { uploadImageWithCache };
