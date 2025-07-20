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
  },
  rent: {
    "1BHK": String,
    "2BHK": String,
    "3BHK": String,
    "4BHK": String,
  },
  advancePayment: String,
  wifiAvailable: Boolean,
  security: {
    cctv: Boolean,
    securityGuards: Boolean,
    gatedCommunity: Boolean,
    fireSafety: Boolean,
  },
}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
