import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
console.log("OMDB_API Key from env:", process.env.OMDB_API_KEY);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Failed:", err));
