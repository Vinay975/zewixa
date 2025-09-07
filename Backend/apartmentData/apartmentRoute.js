const express = require("express");
const cloudinary = require("../cloudinaryConfig");
const Apartment = require("./apartmentModel");
const { uploadImageWithCache } = require("../image/imageUploader");

const router = express.Router();

// Use memory storage multer
const upload = require("../multer").fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
  { name: "ownerPhoto", maxCount: 1 },
]);

router.post("/create-apartment", upload, async (req, res) => {
  try {
    const {
      location,
      wifiAvailable,
      isElectricityIncluded,
      bhkUnits,
      security,
      ownerData,
    } = req.body;

    const bhkData = JSON.parse(bhkUnits);
    const securityData = JSON.parse(security);
    const owner = JSON.parse(ownerData);

    // Upload images to Cloudinary
    const photoPaths = {};
    for (let key in req.files) {
      const file = req.files[key][0];
      photoPaths[key] = await uploadImageWithCache(file, "apartments");
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
      security: {
        cctv: securityData.cctv,
        securityGuards: securityData.securityGuards,
        gatedCommunity: securityData.gatedCommunity,
        fireSafety: securityData.fireSafety,
      },
    });

    await newApartment.save();
    res.status(201).json({
      message: "Apartment created successfully",
      apartment: newApartment,
    });
  } catch (error) {
    console.error("Apartment creation error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Keep existing GET route unchanged
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
