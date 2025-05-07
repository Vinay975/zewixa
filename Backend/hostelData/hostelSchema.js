const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  day: { type: String, required: true },
  tiffin: { type: String, default: "" },
  lunch: { type: String, default: "" },
  snacks: { type: String, default: "" },
  dinner: { type: String, default: "" },
});

const HostelSchema = new mongoose.Schema({
  owner: { 
    name: { type: String, required: true },
    phoneOne: { type: String, required: true },
    phoneTwo: { type: String, required: true },
    email: { type: String, required: true }
  },
  hostelName: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  acType: { type: String, required: true }, 
  floors: { type: Number, required: true },
  rooms: { type: Number, required: true },
  wifi: { type: String, enum: ["yes", "no"], required: true },
  rent: {
    OneSharing: { type: String, required: true },
    TwoSharing: { type: String, required: true },
    ThreeSharing: { type: String, required: true },
    FourSharing: { type: String, required: true },
    FiveSharing: { type: String, required: true },
    Advance: { type: String, required: true },
  },
  meals: [MealSchema],
  photos: {
    main: String,
    messRoom: String,
    topView: String,
    washroom: String,
    roomInterior: String,
    commonArea: String,
    balconyView: String,
    laundryArea: String,
  },
});

module.exports = mongoose.model("Hostel", HostelSchema);
