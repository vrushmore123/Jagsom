require("dotenv").config();
const path = require("path");
const app = require("./config/app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const express = require("express");
const creatorRoutes = require("./routes/creatorRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const videoRoutes = require("./routes/VideoRoute"); // Fixed import (removed duplicate)
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // Change this to match your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Adjust based on your file structure
app.use('/api', videoRoutes); // This ensures your routes are prefixed with /api

// Middleware Routes
app.use("/api/creators", creatorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Serve uploaded videos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/videos', videoRoutes);
// Start the server


app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
