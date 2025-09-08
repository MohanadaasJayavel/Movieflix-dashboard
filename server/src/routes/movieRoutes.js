import express from "express";
import {
  searchMovies,
  getStats,
  getMovieById,
} from "../controllers/movieController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
console.log("movie routes file loading");
router.get("/", searchMovies);
router.get("/stats", getStats);
router.get("/:id", getMovieById);

export default router;
