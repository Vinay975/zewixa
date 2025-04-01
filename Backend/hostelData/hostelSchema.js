const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  ownerDetails: {
    name: { type: String, required: true },
    mobile_number_1: { type: String, required: true },
    mobile_number_2: { type: String, required: true },
    email: { type: String, required: true },
  },

  hostelDetails: {
    hostel_name: { type: String, required: true },
    location: { type: String, required: true }, // You can use GeoJSON for coordinates if needed
    type: { type: String, required: true }, // Example: Boys Hostel, Girls Hostel, PG, etc.
    total_floor: { type: Number, required: true },
    total_Rooms: { type: Number, required: true },
    sharing: { type: Number, required: true },
  },

  photoDetails: {
    main: { type: String, required: true }, // Store image URL or file path
    mess_room: { type: String },
    top_view: { type: String },
    wash_room: { type: String },
    room_interior: { type: String },
    common_area: { type: String },
    balcony_view: { type: String },
    laundry_area: { type: String },
  },

  foodSchedule: [
    {
      day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
      },
      breakfast: { type: String, required: true },
      lunch: { type: String, required: true },
      dinner: { type: String, required: true },
    }
  ],

  hostelInfo: {
    wifi: { type: Boolean, default: false },
    one_sharing: { type: Number },
    two_sharing: { type: Number },
    three_sharing: { type: Number },
    four_sharing: { type: Number },
    advance_rent: { type: Number },
    monthlyRent: { type: Number, required: true },
  },

  createdAt: { type: Date, default: Date.now },
});

const Hostel = mongoose.model("Hostel", hostelSchema);
module.exports = Hostel;
