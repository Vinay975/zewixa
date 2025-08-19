const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  owner: {
    name: String,
    email: String,
    phoneOne: String,
    phoneTwo: String,
    ownerImage: String,
  },
  apartmentName: String,
  location: String,
  wifiAvailable: Boolean,
  electricityIncluded: Boolean,
  security: {
    cctv: Boolean,
    securityGuards: Boolean,
    gatedCommunity: Boolean,
    fireSafety: Boolean,
  },
  bhkUnits: [
    {
      type: String,
      rent: String,
      deposit: String,
      maintenance: String,
    },
  ],
  photos: {
    building: String,
    livingRoom: String,
    kitchen: String,
    bedroom: String,
    bathroom: String,
    balcony: String,
  },
});

module.exports = mongoose.model("Apartment", apartmentSchema);
