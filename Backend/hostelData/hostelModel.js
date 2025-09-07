const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Hostel = require("./hostelSchema");
const cloudinary = require("../cloudinaryConfig");
const router = express.Router();
const { uploadImageWithCache } = require("../image/imageUploader");

// Using Cloudinary for image storage

// Use memory storage for Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only image files allowed"), false),
});

// POST /api/create-hostel
router.post(
  "/create-hostel",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "messRoom", maxCount: 1 },
    { name: "topView", maxCount: 1 },
    { name: "washroom", maxCount: 1 },
    { name: "roomInterior", maxCount: 1 },
    { name: "commonArea", maxCount: 1 },
    { name: "balconyView", maxCount: 1 },
    { name: "laundryArea", maxCount: 1 },
    { name: "messMenu", maxCount: 1 }, // new
    { name: "ownerImage", maxCount: 1 }, // new
  ]),
  async (req, res) => {
    try {
      // 1) Parse JSON payloads
      const ownerData = JSON.parse(req.body.ownerData);
      const hostelData = JSON.parse(req.body.hostelData);
      const rent = JSON.parse(req.body.rent);

      // Map mobile fields to phone fields
      ownerData.phoneOne = ownerData.mobile1;
      ownerData.phoneTwo = ownerData.mobile2;
      delete ownerData.mobile1;
      delete ownerData.mobile2;

      // Upload photos to Cloudinary
      const photos = {};
      for (const key of [
        "main",
        "messRoom",
        "topView",
        "washroom",
        "roomInterior",
        "commonArea",
        "balconyView",
        "laundryArea",
        "messMenu",
      ]) {
        if (req.files[key]) {
          const file = req.files[key][0];
          photos[key] = await uploadImageWithCache(file, "hostels");
        }
      }

      // Upload owner image
      if (req.files.ownerImage) {
        const file = req.files.ownerImage[0];
        ownerData.ownerImage = await uploadImageWithCache(file, "owners");
      }
      // 4) Construct & save
      const hostel = new Hostel({
        owner: ownerData,
        hostelName: hostelData.hostelName,
        location: hostelData.location,
        gender: hostelData.gender,
        acType: hostelData.acType,
        floors: hostelData.floors,
        rooms: hostelData.rooms,
        wifi: req.body.wifi === "true",
        rent,
        photos,
      });

      await hostel.save();
      console.log("Saved hostel:", hostel._id);
      res.status(201).send("Hostel created!");
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Failed to create hostel.");
    }
  }
);

// GET /api/hostels
router.get("/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching hostels" });
  }
});

// DELETE /api/delete-all-hostels
router.delete("/delete-all-hostels", async (req, res) => {
  try {
    await Hostel.deleteMany({});
    res.send("All hostels deleted");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Error deleting hostels");
  }
});

module.exports = router;
