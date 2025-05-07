// routes/hostelRoutes.js
const express = require("express");
const multer = require("multer");
const Hostel = require("./hostelSchema");

const router = express.Router();

// Store files in memory (Buffer) to convert to Base64
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create hostel
router.post("/create-hostel", upload.fields([
  { name: "main" }, { name: "messRoom" }, { name: "topView" },
  { name: "washroom" }, { name: "roomInterior" }, { name: "commonArea" },
  { name: "balconyView" }, { name: "laundryArea" }
]), async (req, res) => {
  try {
    // Parse JSON data from fields
    const ownerData = JSON.parse(req.body.ownerData);
    const hostelData = JSON.parse(req.body.hostelData);
    const meals = JSON.parse(req.body.meals);
    const rent = JSON.parse(req.body.rent);

    // Convert image buffers to Base64 strings
    const photos = {};
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        photos[key] = req.files[key][0].buffer.toString("base64");
      });
    }

    // Create new hostel entry
    const hostel = new Hostel({
      owner: {
        name: ownerData.name,
        phoneOne: ownerData.mobile1,
        phoneTwo: ownerData.mobile2,
        email: ownerData.email,
      },
      hostelName: hostelData.hostelName,
      location: hostelData.location,
      gender: hostelData.gender,
      acType: hostelData.acType,
      floors: parseInt(hostelData.floors),
      rooms: parseInt(hostelData.rooms),
      wifi: hostelData.wifi,
      rent: rent,
      meals: meals,
      photos: photos,
    });

    await hostel.save();
    console.log("✅ Hostel Saved");
    res.status(201).json({ message: "Hostel Created", hostel });
  } catch (error) {
    console.error("❌ Failed to create hostel:", error);
    res.status(500).json({ error: "Failed to create hostel", details: error.message });
  }
});

// Route to fetch all hostels
router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hostels" });
  }
});

module.exports = router;
