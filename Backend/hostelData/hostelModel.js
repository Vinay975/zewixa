const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Hostel = require("./hostelSchema");

const router = express.Router();

// Storage config for saving files to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "Backend/uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."), false);
    }
  },
});

// POST route to upload hostel data with images
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
  ]),
  async (req, res) => {
    try {
      const ownerData = JSON.parse(req.body.ownerData);
      const hostelData = JSON.parse(req.body.hostelData);
      const rent = JSON.parse(req.body.rent);
      const meals = JSON.parse(req.body.meals);

      const photos = {};
      for (const key in req.files) {
        photos[key] = `/uploads/${req.files[key][0].filename}`;
      }

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
        meals,
        photos,
      });

      await hostel.save();
      res.status(201).send("Hostel data saved successfully!");
      console.log("Saved hostel:", hostel._id);
    } catch (err) {
      console.error("Error saving hostel data:", err);
      res.status(500).send("Error saving hostel data.");
    }
  }
);

// GET all hostels
router.get("/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
});

router.delete('/delete-all-hostels', async (req, res) => {
  try {
    await Hostel.deleteMany({});  // Deletes all documents in the collection
    res.status(200).send('All hostel data deleted successfully!');
  } catch (err) {
    console.error('Error deleting hostel data:', err);
    res.status(500).send('Error deleting hostel data.');
  }
});

module.exports = router;
//http://192.168.30.213:5000/hostels
//import FetchingHostelData from "../FecthingData/hosteldata";