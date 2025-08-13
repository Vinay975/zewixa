const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  ownerData: {
    name: String,
    email: String,
    mobile1: String,
    mobile2: String,
    profileImage: String, 
  },

  photos: {
    building: String,     
    livingRoom: String,
    kitchen: String,
    bedroom: String,
    bathroom: String,
    balcony: String,
    ownerPhoto: String,
  },

  location: String, 

  wifiAvailable: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },

  isElectricityIncluded: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },

  bhkUnits: [
    {
      apartmentType: {
        type: String,
        enum: ["1BHK", "2BHK", "3BHK", "4BHK"],
        required: true,
      },
      monthlyRent: String,
      securityDeposit: String,
      maintenanceCharges: String,
    }
  ],

  security: {
    cctv: Boolean,
    securityGuards: Boolean,
    gatedCommunity: Boolean,
    fireSafety: Boolean,
  },

}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
