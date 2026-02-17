const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartment.controller");
const upload = require("../middleware/upload");

const uploadFields = upload.fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
  { name: "ownerPhoto", maxCount: 1 },
]);

router.post("/", uploadFields, apartmentController.createApartment);
router.get("/", apartmentController.getAllApartments);

module.exports = router;
