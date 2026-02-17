const mongoose = require("mongoose");

const imageCacheSchema = new mongoose.Schema({
  hash: { type: String, unique: true, required: true },
  cloudinaryUrl: { type: String, required: true },
  folder: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ImageCache", imageCacheSchema);
