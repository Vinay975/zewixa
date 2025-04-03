const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneOne: { type: String, required: true, unique: true },
  phoneTwo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Owner", OwnerSchema);
