const express = require("express");
const multer = require("multer");
const Hostel = require("./hostelSchema");

const router = express.Router();

// Use memory storage to store image buffers directly
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."), false);
    }
  },
});

// Upload multiple image fields
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
      const hostelData = new Hostel({
        owner: JSON.parse(req.body.ownerData),
        hostelName: JSON.parse(req.body.hostelData).hostelName,
        location: JSON.parse(req.body.hostelData).location,
        gender: JSON.parse(req.body.hostelData).gender,
        acType: JSON.parse(req.body.hostelData).acType,
        floors: JSON.parse(req.body.hostelData).floors,
        rooms: JSON.parse(req.body.hostelData).rooms,
        wifi: req.body.wifi === "true",
        rent: JSON.parse(req.body.rent),
        meals: JSON.parse(req.body.meals),
        photos: {
          main: req.files.main[0].buffer,
          messRoom: req.files.messRoom[0].buffer,
          topView: req.files.topView[0].buffer,
          washroom: req.files.washroom[0].buffer,
          roomInterior: req.files.roomInterior[0].buffer,
          commonArea: req.files.commonArea[0].buffer,
          balconyView: req.files.balconyView[0].buffer,
          laundryArea: req.files.laundryArea[0].buffer,
        },
      });

      await hostelData.save();
      res.status(201).send("Hostel data saved successfully!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving hostel data.");
    }
  }
);

// Fetch all hostels
router.get("/hostels", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
});

module.exports = router;
