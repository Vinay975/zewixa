const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//photos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect("mongodb+srv://Zewixa:Vinay123@hosteldata.wvwi4no.mongodb.net/hostelDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// ROUTES
const hostelRoutes = require("./hostelData/hostelModel");
const userRoutes = require("./userData/userRoute");

app.use("/api", hostelRoutes);
app.use('/', userRoutes);


app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://192.168.43.66:${PORT}`);
});
