import express from "express";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvShowRoutes from "./routes/tvShow.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = ENV_VARS.PORT;
console.log("Database URL: ", ENV_VARS.MONGO_URI);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tvShow", tvShowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
