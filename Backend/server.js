const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Zewixa:Vinay123@hosteldata.wvwi4no.mongodb.net/hostelDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));



// Import Routes
const hostelRoutes = require("./hostelData/hostelModel");
app.use("/api", hostelRoutes); 

app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
