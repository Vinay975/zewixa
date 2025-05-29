const express = require("express");
const multer = require("multer");
const path = require("path");
const Apartment = require("./apartmentModel");
const fs = require("fs");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const cpUpload = upload.fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);
router.post("/create-apartment", cpUpload, async (req, res) => {
  try {
    const { ownerData, rent, advancePayment, wifiAvailable, security } = req.body;

    // Parse JSON fields
    const owner = ownerData ? JSON.parse(ownerData) : {};
    console.log(owner);
    const rentParsed = rent ? JSON.parse(rent) : {};
    const securityParsed = security ? JSON.parse(security) : {};
    const wifiBool = wifiAvailable === "yes" || wifiAvailable === true;

    // Build photos object from uploaded files
    const photos = {};
    if (req.files) {
      Object.entries(req.files).forEach(([key, files]) => {
        photos[key] = files[0].path; // save the file path
      });
    }

    // Create new Apartment document
    const apartment = new Apartment({
      ownerData: owner,
      photos,
      rent: {
        "1BHK": rentParsed.oneBHK || "",
        "2BHK": rentParsed.twoBHK || "",
        "3BHK": rentParsed.threeBHK || "",
        "4BHK": rentParsed.fourBHK || "",
      },
      advancePayment,
      wifiAvailable: wifiBool,
      security: securityParsed,
    });

    await apartment.save();

    res.status(201).json({ message: "Apartment created successfully", apartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


