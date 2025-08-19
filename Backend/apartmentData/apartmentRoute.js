const express = require("express");
const multer = require("multer");
const Apartment = require("../apartmentData/apartmentModel"); // ✅ adjust path if needed
const cloudinary = require("../cloudinaryConfig");

const router = express.Router();

// ================== Multer Config ==================
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);

// ================== Create Apartment ==================
router.post("/create-apartment", uploadFields, async (req, res) => {
  try {
    const form = req.body;
    const files = req.files;

    console.log("\n📩 Incoming Form Data:", form);

    // Parse JSON fields
    let bhkUnits = [];
    let security = {};
    try {
      bhkUnits = JSON.parse(form.bhkUnits || "[]");
    } catch (err) {
      console.log("❌ Error parsing bhkUnits:", err.message);
    }
    try {
      security = JSON.parse(form.security || "{}");
    } catch (err) {
      console.log("❌ Error parsing security:", err.message);
    }

    // Upload Images to Cloudinary
    const photos = {};
    for (const key in files) {
      const file = files[key][0];
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "apartments" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
      photos[key] = await uploadPromise;
    }

    // Create Apartment object
    const apartment = new Apartment({
      ownerData: { email: form.ownerEmail },
      photos,
      location: form.location,
      wifiAvailable: form.wifiAvailable,
      isElectricityIncluded: form.isElectricityIncluded,
      bhkUnits,
      security,
    });

    // Save in MongoDB
    await apartment.save();
    console.log("✅ Apartment saved:", apartment._id);

    res.status(200).json({
      message: "Apartment created successfully ✅",
      apartment,
    });
  } catch (err) {
    console.error("❌ Error saving apartment:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================== Test API ==================
router.get("/get/apartments", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

module.exports = router;
