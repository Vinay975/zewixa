const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://Zewixa:Vinay123@hosteldata.wvwi4no.mongodb.net/hostelDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


//HostelData
const HostelData = require("./hostelData/hostelModel")
app.use("/api/hostels", HostelData);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
