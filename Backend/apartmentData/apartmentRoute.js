const express = require("express");
const multer = require("multer");
const Apartment = require("./apartmentModel");
const cloudinary = require("../cloudinaryConfig");
const { Readable } = require("stream");

const router = express.Router();

// Multer memory storage
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

// Helper to upload buffer to Cloudinary
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    readable.pipe(stream);
  });
};

// POST create apartment
router.post("/create-apartment", upload, async (req, res) => {
  try {
    const { location, wifiAvailable, isElectricityIncluded, bhkUnits, security, ownerData } = req.body;

    const bhkData = JSON.parse(bhkUnits);
    const securityData = JSON.parse(security);
    const owner = JSON.parse(ownerData);

    // Upload images to Cloudinary
    const photoPaths = {};
    for (const key in req.files) {
      const file = req.files[key][0];
      const result = await streamUpload(file.buffer, `apartments/${key}`);
      photoPaths[key] = result.secure_url;
    }

    const newApartment = new Apartment({
      ownerData: {
        name: owner.name,
        email: owner.email,
        mobile1: owner.mobile1,
        mobile2: owner.mobile2,
        profileImage: owner.profileImage, 
      },
      photos: photoPaths,
      location,
      wifiAvailable,
      isElectricityIncluded,
      bhkUnits: bhkData,
      security: securityData,
    });

    await newApartment.save();
    res.status(201).json({ message: "Apartment created successfully", apartment: newApartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET all apartments
router.get("/get-apartment-data", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
