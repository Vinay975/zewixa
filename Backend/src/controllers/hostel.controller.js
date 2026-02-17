const Hostel = require("../models/hostel.model");
const { uploadImageWithCache } = require("../utils/imageUploader");

// Create hostel
exports.createHostel = async (req, res) => {
  try {
    const ownerData = JSON.parse(req.body.ownerData);
    const hostelData = JSON.parse(req.body.hostelData);
    const rent = JSON.parse(req.body.rent);

    // Map mobile fields to phone fields
    ownerData.phoneOne = ownerData.mobile1;
    ownerData.phoneTwo = ownerData.mobile2;
    delete ownerData.mobile1;
    delete ownerData.mobile2;

    // Upload photos to Cloudinary
    const photos = {};
    const photoKeys = ["main", "messRoom", "topView", "washroom", "roomInterior", "commonArea", "balconyView", "laundryArea", "messMenu"];
    
    for (const key of photoKeys) {
      if (req.files[key]) {
        photos[key] = await uploadImageWithCache(req.files[key][0], "hostels");
      }
    }

    // Upload owner image
    if (req.files.ownerImage) {
      ownerData.ownerImage = await uploadImageWithCache(req.files.ownerImage[0], "owners");
    }

    // Create hostel
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
      photos,
    });

    await hostel.save();
    res.status(201).json({ message: "Hostel created successfully", hostel });
  } catch (error) {
    console.error("Create hostel error:", error);
    res.status(500).json({ message: "Failed to create hostel", error: error.message });
  }
};

// Get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    console.error("Fetch hostels error:", error);
    res.status(500).json({ message: "Error fetching hostels", error: error.message });
  }
};

// Delete all hostels
exports.deleteAllHostels = async (req, res) => {
  try {
    await Hostel.deleteMany({});
    res.json({ message: "All hostels deleted successfully" });
  } catch (error) {
    console.error("Delete hostels error:", error);
    res.status(500).json({ message: "Error deleting hostels", error: error.message });
  }
};
