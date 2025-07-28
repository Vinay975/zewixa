const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Apartment = require("./apartmentModel");

const router = express.Router();

// Folder for apartment images
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "forApartmentPhotos");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Fields for different photo types
const upload = multer({ storage }).fields([
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
      bhkUnits, // this will be a JSON string from the frontend
      security, // also a JSON string
      ownerData, // also a JSON string
    } = req.body;

    console.log("FILES:", req.files);
    console.log("BODY:", req.body);


    // Parse stringified fields
    const bhkData = JSON.parse(bhkUnits);
    const securityData = JSON.parse(security);
    const owner = JSON.parse(ownerData);

    // Collect photo paths
    const photoPaths = {};
    for (let key in req.files) {
      photoPaths[key] = `/uploads/forApartmentPhotos/${req.files[key][0].filename}`;
    }

    const newApartment = new Apartment({
      ownerData: {
        name: owner.name,
        email: owner.email,
        mobile1: owner.mobile1,
        mobile2: owner.mobile2,
        profileImage: owner.profileImage, // assuming it's a URL or base64 string
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
    console.log(newApartment);
    await newApartment.save();
    res.status(201).json({ message: "Apartment created successfully", apartment: newApartment });
  } catch (error) {

    console.error("Apartment creation error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


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
