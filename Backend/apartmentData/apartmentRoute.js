const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Apartment = require("./apartmentModel");

const router = express.Router();

// Create upload directory if it doesn't exist
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer storage
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

// Setup multer upload with required fields
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "owner", maxCount: 1 },
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);

// Route to create apartment
router.post("/create-apartment", uploadFields, async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", Object.keys(req.files || {}));

    const {
      ownerData,
      rentOne,
      rentTwo,
      rentThree,
      rentFour,
      rentFive,
      advance,
      wifiAvailable,
      wifiProvider,
      securityDeposit,
      cctv,
      nightGuard,
    } = req.body;

    if (!ownerData) {
      return res.status(400).json({ message: "Missing ownerData in request body" });
    }

    const owner = JSON.parse(ownerData); // because you stringify in frontend

    const getFilename = (field) => req.files?.[field]?.[0]?.filename || "";

    const apartment = new Apartment({
      ownerName: owner.name,
      ownerEmail: owner.email,
      ownerMobile: owner.mobile,
      ownerPhoto: getFilename("owner"),
      photos: {
        building: getFilename("building"),
        livingRoom: getFilename("livingRoom"),
        kitchen: getFilename("kitchen"),
        bedroom: getFilename("bedroom"),
        bathroom: getFilename("bathroom"),
        balcony: getFilename("balcony"),
      },
      rent: {
        oneSharing: rentOne,
        twoSharing: rentTwo,
        threeSharing: rentThree,
        fourSharing: rentFour,
        fiveSharing: rentFive,
        advance,
      },
      wifi: {
        available: wifiAvailable === "true",
        provider: wifiProvider || "",
      },
      security: {
        deposit: securityDeposit,
        cctv: cctv === "true",
        nightGuard: nightGuard === "true",
      },
    });

    await apartment.save();

    res.status(201).json({ message: "Apartment created successfully", apartment });
  } catch (error) {
    console.error("CREATE APARTMENT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;