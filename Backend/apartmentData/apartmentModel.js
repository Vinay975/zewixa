const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  ownerData: {
    email: { type: String, required: true }
  },
  photos: {
    building: String,
    livingRoom: String,
    kitchen: String,
    bedroom: String,
    bathroom: String,
    balcony: String,
  },
  location: String,
  wifiAvailable: Boolean,
  isElectricityIncluded: Boolean,
  bhkUnits: [
    {
      apartmentType: String,
      monthlyRent: String,
      securityDeposit: String,
      maintenanceCharges: String,
    }
  ],
  security: Object
}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
