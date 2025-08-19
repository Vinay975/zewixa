const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Apartment = require("../apartmentData/apartmentModel");

const router = express.Router();

// ================= Upload Setup =================
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "forApartmentPhotos");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => file.mimetype.startsWith("image/")
    ? cb(null, true)
    : cb(new Error("Only image files allowed"), false)
});

// ================= Routes =================

// POST /api/create-apartment
router.post(
  "/create-apartment",
  upload.fields([
    { name: "building",   maxCount: 1 },
    { name: "livingRoom", maxCount: 1 },
    { name: "kitchen",    maxCount: 1 },
    { name: "bedroom",    maxCount: 1 },
    { name: "bathroom",   maxCount: 1 },
    { name: "balcony",    maxCount: 1 },
    { name: "ownerImage", maxCount: 1 }, // optional owner photo
  ]),
  async (req, res) => {
    try {
      // 1) Parse JSON payloads
      const ownerData     = JSON.parse(req.body.ownerData);
      const apartmentData = JSON.parse(req.body.apartmentData);
      const bhkUnits      = JSON.parse(req.body.bhkUnits);
      const security      = JSON.parse(req.body.security);

      // Map uploaded photos
      const photos = {};
      for (const key of ["building","livingRoom","kitchen","bedroom","bathroom","balcony"]) {
        if (req.files[key]) {
          photos[key] = `/uploads/forApartmentPhotos/${req.files[key][0].filename}`;
        }
      }

      // Owner image
      if (req.files.ownerImage) {
        ownerData.ownerImage = `/uploads/forApartmentPhotos/${req.files.ownerImage[0].filename}`;
      }

      // 2) Construct & save
      const apartment = new Apartment({
        owner:        ownerData,
        apartmentName: apartmentData.apartmentName,
        location:     apartmentData.location,
        wifiAvailable: req.body.wifiAvailable === "true",
        electricityIncluded: req.body.electricityIncluded === "true",
        security,
        bhkUnits,
        photos,
      });

      await apartment.save();
      console.log("✅ Saved apartment:", apartment._id);
      res.status(201).send("Apartment created!");
    } catch (err) {
      console.error("❌ Error creating apartment:", err);
      res.status(500).send("Failed to create apartment.");
    }
  }
);

// GET /api/apartments
router.get("/apartments", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Error fetching apartments" });
  }
});

// DELETE /api/delete-all-apartments
router.delete("/delete-all-apartments", async (req, res) => {
  try {
    await Apartment.deleteMany({});
    res.send("All apartments deleted");
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).send("Error deleting apartments");
  }
});

module.exports = router;