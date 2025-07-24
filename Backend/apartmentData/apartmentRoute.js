const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Apartment = require("./apartmentModel");

const router = express.Router();

const APARTMENT_UPLOADS_DIR = path.join(__dirname, "..", "uploads", "forApartmentPhotos");

if (!fs.existsSync(APARTMENT_UPLOADS_DIR)) {
  fs.mkdirSync(APARTMENT_UPLOADS_DIR, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, APARTMENT_UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });


const uploadFields = upload.fields([
  { name: "ownerPhoto", maxCount: 1 },
  { name: "building", maxCount: 1 },
  { name: "livingRoom", maxCount: 1 },
  { name: "kitchen", maxCount: 1 },
  { name: "bedroom", maxCount: 1 },
  { name: "bathroom", maxCount: 1 },
  { name: "balcony", maxCount: 1 },
]);


router.post("/create-apartment", uploadFields, async (req, res) => {
  try {
    const {
      ownerData,
      rent,
      advancePayment,
      wifiAvailable,
      security,
    } = req.body;

    if (!ownerData) {
      return res.status(400).json({ message: "Missing ownerData in request body" });
    }

    const owner = JSON.parse(ownerData);
    const rentObj = JSON.parse(rent);
    const securityObj = JSON.parse(security || "{}");

    const getPhotoPath = (field) => {
      const file = req.files?.[field]?.[0];
      return file ? `/uploads/forApartmentPhotos/${file.filename}` : "";
    };

    const apartment = new Apartment({
      ownerName: owner.name,
      ownerEmail: owner.email,
      ownerMobile: owner.mobile,
      ownerPhoto: getPhotoPath("ownerPhoto"),

      photos: {
        building: getPhotoPath("building"),
        livingRoom: getPhotoPath("livingRoom"),
        kitchen: getPhotoPath("kitchen"),
        bedroom: getPhotoPath("bedroom"),
        bathroom: getPhotoPath("bathroom"),
        balcony: getPhotoPath("balcony"),
      },

      rent: {
        oneSharing: rentObj.oneBHK,
        twoSharing: rentObj.twoBHK,
        threeSharing: rentObj.threeBHK,
        fourSharing: rentObj.fourBHK,
        advance: advancePayment,
      },

      wifi: {
        available: wifiAvailable === "yes",
        provider: "",
      },

      security: {
        deposit: "",
        cctv: securityObj.cctv || false,
        nightGuard: securityObj.securityGuards || false,
        gatedCommunity: securityObj.gatedCommunity || false,
        fireSafety: securityObj.fireSafety || false,
      },

      createdAt: new Date(),
    });

    await apartment.save();

    res.status(201).json({
      message: "Apartment created successfully",
      apartment,
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/get-apartment-data", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
