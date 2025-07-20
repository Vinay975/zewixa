const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  ownerName: String,
  ownerEmail: String,
  ownerMobile: String,
  ownerPhoto: String,
  photos: {
    building: String,
    livingRoom: String,
    kitchen: String,
    bedroom: String,
    bathroom: String,
    balcony: String,
  },
  rent: {
    oneSharing: String,
    twoSharing: String,
    threeSharing: String,
    fourSharing: String,
    fiveSharing: String,
    advance: String,
  },
  wifi: {
    available: Boolean,
    provider: String,
  },
  security: {
    deposit: String,
    cctv: Boolean,
    nightGuard: Boolean,
  },
});

module.exports = mongoose.model("Apartment", apartmentSchema);
