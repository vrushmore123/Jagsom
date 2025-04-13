require("dotenv").config();
const app = require("./config/app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const creatorRoutes = require("./routes/creatorRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use("/api/creators", creatorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
