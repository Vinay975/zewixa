const express = require("express");
const multer = require("multer");
const Apartment = require("./apartmentModel");
const cloudinary = require("../cloudinaryConfig");
const { Readable } = require("stream");

const router = express.Router();

// 🟣 Multer memory storage

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);

// 🟣 Helper to upload buffer to Cloudinary
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    console.log("📂 Uploading to Cloudinary folder:", folder);

    const readable = new Readable();
    readable._read = () => { };
    readable.push(buffer);
    readable.push(null);

    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    
    readable.pipe(stream);
  });
};

// 🟣 POST /create-apartment
router.post("/create-apartment", upload, async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);
    console.log("📸 Incoming files:", Object.keys(req.files || {}));

    const { location, wifiAvailable, isElectricityIncluded, bhkUnits, security, ownerEmail } = req.body;

    if (!location) return res.status(400).json({ message: "Location is required" });

    let bhkData, securityData;
    try {
      // ✅ Change Starts Here
      // This ensures that if bhkUnits or security are missing or malformed,
      // they default to an empty array or object instead of causing a parse error.
      bhkData = bhkUnits ? JSON.parse(bhkUnits) : [];
      securityData = security ? JSON.parse(security) : {};
      // ✅ Change Ends Here
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in request body", error: err.message });
    }

    const photoPaths = {};
    if (req.files) {
      for (const [key, file] of Object.entries(req.files)) {
        try {
          const result = await streamUpload(file[0].buffer, `apartments/${key}`);
          if (!result?.secure_url) {
            throw new Error(`Cloudinary upload failed for ${key}`);
          }
          photoPaths[key] = result.secure_url;
        } catch (cloudErr) {
          console.error(`❌ Cloudinary upload failed for ${key}`, cloudErr);
          return res.status(500).json({
            message: "Image upload failed",
            error: cloudErr.message,
            fileKey: key,
          });
        }
      }
    }

    const newApartment = new Apartment({
      ownerData: { email: ownerEmail || "" },
      photos: photoPaths,
      location,
      wifiAvailable,
      isElectricityIncluded,
      bhkUnits: bhkData,
      security: securityData,
    });

    await newApartment.save();

    res.status(201).json({
      message: "Apartment created successfully",
      apartment: newApartment,
      photos: photoPaths,
    });
  } catch (error) {
    console.error("❌ Apartment creation error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: error.stack,
    });
  }
});

// 🟣 GET /get-apartment-data
router.get("/get-apartment-data", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;