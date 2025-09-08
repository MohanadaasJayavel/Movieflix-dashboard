import axios from "axios";
import Movie from "../models/Movie.js";

// 🔎 Search Movies
export const searchMovies = async (req, res) => {
  try {
    const OMDB_API = process.env.OMDB_API_KEY;
    const {
      search = "",
      sort = "rating",
      order = "desc",
      filter,
      limit = 20,
      page = 1,
    } = req.query;

    let query = {};
    if (search) query.title = new RegExp(search, "i");

    if (filter) {
      const [key, raw] = filter.split(":");
      if (key === "genre") {
        const values = raw.split(",").map((s) => s.trim());
        query.genre = { $in: values };
      } else if (key === "year") {
        query.year = Number(raw);
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Try cache first
    let movies = await Movie.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    if (movies.length === 0 && search) {
      const url = `http://www.omdbapi.com/?apikey=${OMDB_API}&s=${encodeURIComponent(
        search
      )}`;
      const response = await axios.get(url);

      if (response.data.Response === "False") {
        return res
          .status(400)
          .json({ error: response.data.Error || "No results" });
      }

      const detailedMovies = await Promise.all(
        response.data.Search.map(async (m) => {
          const full = await axios.get(
            `http://www.omdbapi.com/?apikey=${OMDB_API}&i=${m.imdbID}`
          );
          const d = full.data;

          const normalized = {
            imdbID: d.imdbID,
            title: d.Title,
            year: Number(d.Year) || undefined,
            genre: d.Genre ? d.Genre.split(", ").filter(Boolean) : [],
            director: d.Director,
            actors: d.Actors ? d.Actors.split(", ").filter(Boolean) : [],
            rating: isFinite(Number(d.imdbRating))
              ? Number(d.imdbRating)
              : undefined,
            runtime: d.Runtime?.includes("min")
              ? Number(d.Runtime.replace(" min", ""))
              : undefined,
            plot: d.Plot,
            poster: d.Poster,
            lastFetched: new Date(),
          };

          return await Movie.findOneAndUpdate(
            { imdbID: normalized.imdbID },
            { $set: normalized },
            { new: true, upsert: true }
          );
        })
      );

      movies = await Movie.find(query)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit));
    }

    const total = await Movie.countDocuments(query);

    res.json({
      data: movies.map((m) => ({
        ...m.toObject(),
        imdbUrl: `https://www.imdb.com/title/${m.imdbID}/`,
      })),
      page: Number(page),
      limit: Number(limit),
      total,
    });
  } catch (err) {
    console.error("searchMovies error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch movies", details: err.message });
  }
};

// 📊 Stats Aggregation
export const getStats = async (req, res) => {
  try {
    const movies = await Movie.find();

    const genreCount = {};
    const ratingsByGenre = {};
    const runtimeByYear = {};
    let ratingSum = 0,
      ratingCount = 0;

    movies.forEach((m) => {
      if (Array.isArray(m.genre)) {
        m.genre.forEach((g) => {
          genreCount[g] = (genreCount[g] || 0) + 1;
          ratingsByGenre[g] = ratingsByGenre[g] || [];
          if (typeof m.rating === "number") ratingsByGenre[g].push(m.rating);
        });
      }

      if (m.year && m.runtime) {
        runtimeByYear[m.year] = runtimeByYear[m.year] || [];
        runtimeByYear[m.year].push(m.runtime);
      }

      if (typeof m.rating === "number") {
        ratingSum += m.rating;
        ratingCount += 1;
      }
    });

    const avgRatings = Object.fromEntries(
      Object.entries(ratingsByGenre).map(([g, arr]) => [
        g,
        arr.reduce((a, b) => a + b, 0) / arr.length,
      ])
    );
    const avgRuntime = Object.fromEntries(
      Object.entries(runtimeByYear).map(([y, arr]) => [
        y,
        arr.reduce((a, b) => a + b, 0) / arr.length,
      ])
    );

    const avgAllRatings = ratingCount ? ratingSum / ratingCount : 0;

    res.json({ genreCount, avgRatings, avgRuntime, avgAllRatings });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch stats", details: err.message });
  }
};

// 🎬 Get Single Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const OMDB_API = process.env.OMDB_API_KEY;

    let movie = await Movie.findOne({ imdbID: id });

    if (!movie) {
      const full = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API}&i=${id}`
      );
      const d = full.data;

      if (d.Response === "False") {
        return res.status(404).json({ error: "Movie not found" });
      }

      const normalized = {
        imdbID: d.imdbID,
        title: d.Title,
        year: Number(d.Year) || undefined,
        genre: d.Genre ? d.Genre.split(", ").filter(Boolean) : [],
        director: d.Director,
        actors: d.Actors ? d.Actors.split(", ").filter(Boolean) : [],
        rating: isFinite(Number(d.imdbRating))
          ? Number(d.imdbRating)
          : undefined,
        runtime: d.Runtime?.includes("min")
          ? Number(d.Runtime.replace(" min", ""))
          : undefined,
        plot: d.Plot,
        poster: d.Poster,
        lastFetched: new Date(),
      };

      movie = await Movie.findOneAndUpdate(
        { imdbID: normalized.imdbID },
        { $set: normalized },
        { new: true, upsert: true }
      );
    }

    res.json({
      ...movie.toObject(),
      imdbUrl: `https://www.imdb.com/title/${movie.imdbID}/`,
    });
  } catch (err) {
    console.error("getMovieById error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch movie details", details: err.message });
  }
};
