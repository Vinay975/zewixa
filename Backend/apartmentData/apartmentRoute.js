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
  { name: "ownerPhoto", maxCount: 1 },
]);

// 🟣 Helper to upload buffer to Cloudinary
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });

    readable.pipe(stream);
  });
};

// 🟣 POST /create-apartment
router.post("/create-apartment", upload, async (req, res) => {
  try {
    const { location, wifiAvailable, isElectricityIncluded, bhkUnits, security, ownerData } = req.body;

    // Validate required fields
    if (!location) return res.status(400).json({ message: "Location is required" });
    if (!bhkUnits) return res.status(400).json({ message: "BHK units are required" });

    // Parse JSON safely
    let bhkData, securityData, owner;
    try {
      bhkData = JSON.parse(bhkUnits);
      securityData = JSON.parse(security);
      owner = JSON.parse(ownerData);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in request body" });
    }

    // Upload apartment photos (skip ownerPhoto)
    const photoPaths = {};
    for (const key in req.files) {
      if (key === "ownerPhoto") continue; // skip owner photo
      const file = req.files[key][0];
      const result = await streamUpload(file.buffer, `apartments/${key}`);
      photoPaths[key] = result.secure_url;
    }

    // Upload owner photo if provided
    if (req.files.ownerPhoto) {
      const ownerResult = await streamUpload(req.files.ownerPhoto[0].buffer, "apartments/ownerPhoto");
      owner.profileImage = ownerResult.secure_url;
    }

    // Create new apartment document
    const newApartment = new Apartment({
      ownerData: {
        name: owner.name,
        email: owner.email,
        mobile1: owner.mobile1,
        mobile2: owner.mobile2,
        profileImage: owner.profileImage || "",
      },
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
      ownerPhoto: owner.profileImage,
    });

  } catch (error) {
    console.error("Apartment creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🟣 GET /get-apartment-data
router.get("/get-apartment-data", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
