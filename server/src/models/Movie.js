import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    imdbID: { type: String, unique: true, index: true },
    title: String,
    year: Number,
    genre: [String],
    director: String,
    actors: [String],
    rating: Number,
    runtime: Number,
    plot: String,
    poster: String,
    lastFetched: {
      type: Date,
      default: Date.now,
      index: true,
      expires: 60 * 60 * 24,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
