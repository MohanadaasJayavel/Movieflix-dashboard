import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movieflix";
export const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
export const OMDB_API_KEY = process.env.OMDB_API_KEY || "b58afe3a";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
