const express = require("express");
const router = express.Router();
const hostelController = require("../controllers/hostel.controller");
const upload = require("../middleware/upload");

// Define upload fields
const uploadFields = upload.fields([
  { name: "main", maxCount: 1 },
  { name: "messRoom", maxCount: 1 },
  { name: "topView", maxCount: 1 },
  { name: "washroom", maxCount: 1 },
  { name: "roomInterior", maxCount: 1 },
  { name: "commonArea", maxCount: 1 },
  { name: "balconyView", maxCount: 1 },
  { name: "laundryArea", maxCount: 1 },
  { name: "messMenu", maxCount: 1 },
  { name: "ownerImage", maxCount: 1 },
]);

// Routes
router.post("/", uploadFields, hostelController.createHostel);
router.get("/", hostelController.getAllHostels);
router.delete("/", hostelController.deleteAllHostels);

module.exports = router;
