const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  tiffin: String,
  lunch: String,
  snacks: String,
  dinner: String,
});

const rentSchema = new mongoose.Schema({
  singleSharing: Number,
  doubleSharing: Number,
  tripleSharing: Number,
  advance: Number,
});

const photoSchema = new mongoose.Schema({
  main: Buffer,
  messRoom: Buffer,
  topView: Buffer,
  washroom: Buffer,
  roomInterior: Buffer,
  commonArea: Buffer,
  balconyView: Buffer,
  laundryArea: Buffer,
});

const hostelSchema = new mongoose.Schema({
  owner: {
    name: String,
    email: String,
    phone: String,
  },
  hostelName: String,
  location: String,
  gender: String,
  acType: String,
  floors: Number,
  rooms: Number,
  wifi: Boolean,
  rent: rentSchema,
  meals: [mealSchema],
  photos: photoSchema,
});

module.exports = mongoose.model("Hostel", hostelSchema);
