const express = require("express");
const Hostel = require("./hostelSchema"); // Adjust the path as needed
const router = express.Router();

// POST Route to Save Hostel Data
router.post("/saveHostel", async (req, res) => {
  try {
    const {
      ownerDetails,
      hostelDetails,
      photoDetails,
      foodSchedule,
      hostelInfo,
    } = req.body;

    // Create a new Hostel document based on the data received from the user
    const newHostel = new Hostel({
      ownerDetails,
      hostelDetails,
      photoDetails,
      foodSchedule,
      hostelInfo,
    });

    // Save to MongoDB
    await newHostel.save();

    // Send a success response
    res.status(201).json({ message: "Hostel saved successfully", newHostel });
  } catch (err) {
    console.error("Error saving hostel data:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
