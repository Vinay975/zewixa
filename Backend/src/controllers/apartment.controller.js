const Apartment = require("../models/apartment.model");
const { uploadImageWithCache } = require("../utils/imageUploader");

// Create apartment
exports.createApartment = async (req, res) => {
  try {
    const { location, wifiAvailable, isElectricityIncluded, bhkUnits, security, ownerData } = req.body;

    const bhkData = JSON.parse(bhkUnits);
    const securityData = JSON.parse(security);
    const owner = JSON.parse(ownerData);

    // Upload images to Cloudinary
    const photoPaths = {};
    for (let key in req.files) {
      photoPaths[key] = await uploadImageWithCache(req.files[key][0], "apartments");
    }

    const newApartment = new Apartment({
      ownerData: {
        name: owner.name,
        email: owner.email,
        mobile1: owner.mobile1,
        mobile2: owner.mobile2,
        profileImage: owner.profileImage,
      },
      photos: photoPaths,
      location,
      wifiAvailable,
      isElectricityIncluded,
      bhkUnits: bhkData,
      security: {
        cctv: securityData.cctv,
        securityGuards: securityData.securityGuards,
        gatedCommunity: securityData.gatedCommunity,
        fireSafety: securityData.fireSafety,
      },
    });

    await newApartment.save();
    res.status(201).json({ message: "Apartment created successfully", apartment: newApartment });
  } catch (error) {
    console.error("Create apartment error:", error);
    res.status(500).json({ message: "Failed to create apartment", error: error.message });
  }
};

// Get all apartments
exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    console.error("Fetch apartments error:", error);
    res.status(500).json({ message: "Error fetching apartments", error: error.message });
  }
};
