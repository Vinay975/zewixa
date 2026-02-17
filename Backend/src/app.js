const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const hostelRoutes = require("./routes/hostel.routes");
const apartmentRoutes = require("./routes/apartment.routes");
const userRoutes = require("./routes/user.routes");
const hostRoutes = require("./routes/host.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/hostels", hostelRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hosts", hostRoutes);

// Legacy routes for backward compatibility
app.use("/api", hostelRoutes); // For /api/create-hostel, /api/hostels
app.use("/api", apartmentRoutes); // For /api/create-apartment, /api/get-apartment-data
app.use("/", userRoutes); // For /signup, /signin
app.use("/host", hostRoutes); // For /host/signup, /host/signin

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Habita API is running!",
    version: "1.0.0",
    status: "active"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

module.exports = app;
