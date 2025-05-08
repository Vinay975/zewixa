const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Zewixa:Vinay123@hosteldata.wvwi4no.mongodb.net/hostelDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
const hostelRoutes = require("./hostelData/hostelModel"); // Now requiring the router
app.use("/api", hostelRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://192.168.43.66:${PORT}`);
});
