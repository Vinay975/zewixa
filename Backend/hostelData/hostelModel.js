const express = require("express");
const multer = require("multer");
const router = express.Router();
const Hostel = require("./hostelSchema");

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create-hostel", upload.fields([
  { name: "main" }, { name: "messRoom" }, { name: "topView" }, { name: "washroom" },
  { name: "roomInterior" }, { name: "commonArea" }, { name: "balconyView" }, { name: "laundryArea" }
]), async (req, res) => {
  try {
    console.log("✅ Received Body Data:", req.body);
    console.log("✅ Received Files:", req.files || "No files received");

    if (!req.body.ownerData || !req.body.hostelData) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Handle case where req.files is undefined
    const photos = {};
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        photos[key] = req.files[key][0].buffer.toString("base64");
      });
    }

    let meals = [];
    try {
      meals = JSON.parse(req.body.hostelData.meals || "[]");
    } catch (error) {
      console.error("❌ Invalid Meals Data:", error);
      return res.status(400).json({ error: "Invalid meals format" });
    }

    const hostel = new Hostel({
      owner: JSON.parse(req.body.ownerData),
      hostelName: JSON.parse(req.body.hostelData).name,
      location: JSON.parse(req.body.hostelData).location,
      wifi: JSON.parse(req.body.hostelData).wifi,
      rent: JSON.parse(req.body.hostelData).rent,
      meals: meals,
      photos: photos,
    });

    await hostel.save();
    console.log("✅ Hostel Saved Successfully!");
    res.status(201).json({ message: "Hostel Created", hostel });

  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.status(500).json({ error: "Failed to create hostel", details: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hostels" });
  }
});


module.exports = router;
