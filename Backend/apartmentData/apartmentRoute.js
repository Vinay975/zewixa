const express = require("express");
const multer = require("multer");
const router = express.Router();

// Multer: store uploaded images in memory (no saving yet)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept these fields from multipart/form-data
const uploadFields = upload.fields([
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);

router.post("/create-apartment", uploadFields, (req, res) => {
  try {
    const form = req.body;
    const files = req.files;

    // Print raw body fields
    console.log("\n================= 📩 Raw Form Data =================");
    console.log("Owner Email:", form.ownerEmail);
    console.log("Location:", form.location);
    console.log("WiFi Available:", form.wifiAvailable);
    console.log("Electricity Included:", form.isElectricityIncluded);

    // Try parsing JSON fields
    console.log("\n================= 🏢 BHK Units =================");
    try {
      const bhkUnits = JSON.parse(form.bhkUnits);
      console.log(bhkUnits);
    } catch (err) {
      console.log("❌ Error parsing BHK Units:", err.message);
    }

    console.log("\n================= 🛡️ Security Features =================");
    try {
      const security = JSON.parse(form.security);
      console.log(security);
    } catch (err) {
      console.log("❌ Error parsing Security Features:", err.message);
    }

    // Print uploaded file info
    console.log("\n================= 🖼 Uploaded Images =================");
    if (!files || Object.keys(files).length === 0) {
      console.log("No files received.");
    } else {
      Object.entries(files).forEach(([key, fileArr]) => {
        console.log(`${key}:`, fileArr[0].originalname, `(${fileArr[0].size} bytes)`);
      });
    }

    console.log("\n✅ All data received successfully.\n");

    return res.status(200).json({ message: "Data received successfully ✅" });
  } catch (err) {
    console.error("❌ Server Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.get("/test", (req, res) => {
  res.send("Apartment API is working 🚀");
});

module.exports = router;
