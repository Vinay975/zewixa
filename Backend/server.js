const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
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
const apartmentRoute = require("./apartmentData/apartmentRoute")
const hostUserRoute = require('./hostDataForLogin/hostdataRoute')

app.use("/api", hostelRoutes);
app.use("/api",apartmentRoute)
app.use('/', userRoutes);
app.use('/host',hostUserRoute)




app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
