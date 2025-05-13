const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  OneSharing: Number,
  TwoSharing: Number,
  ThreeSharing: Number,
  FourSharing:Number,
  FiveSharing:Number,
  Advance: Number,
});

const photoSchema = new mongoose.Schema({
  main:         String,
  messRoom:     String,
  topView:      String,
  washroom:     String,
  roomInterior: String,
  commonArea:   String,
  balconyView:  String,
  laundryArea:  String,
  messMenu:     String,   // ← Mess menu photo
});

const hostelSchema = new mongoose.Schema({
  owner: {
    name:       { type: String, required: true },
    email:      { type: String, required: true },
    phoneOne:   { type: String, required: true }, // first phone number
    phoneTwo:   { type: String },                 // second (optional)
    ownerImage: { type: String },                 // owner’s profile photo URI
  },
  hostelName: { type: String, required: true },
  location:   { type: String, required: true },
  gender:     { type: String,  required: true },
  acType:     { type: String },
  floors:     { type: Number },
  rooms:      { type: Number },
  wifi:       { type: Boolean, default: false },
  rent:       rentSchema,
  photos:     photoSchema,
}, {
  timestamps: true
});

module.exports = mongoose.model("Hostel", hostelSchema);
