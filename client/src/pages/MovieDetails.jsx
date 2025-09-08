import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => setError("Failed to fetch movie details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading movie details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!movie) return <p className="p-6">No movie found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {movie.title} <span className="text-gray-500">({movie.year})</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-60 shadow-lg rounded-lg"
        />
        <div>
          <p className="mb-2">{movie.plot}</p>
          <p className="mb-1">
            <b>Director:</b> {movie.director}
          </p>
          <p className="mb-1">
            <b>Actors:</b> {movie.actors?.join(", ")}
          </p>
          <p className="mb-1">
            <b>Genre:</b> {movie.genre?.join(", ")}
          </p>
          <p className="mb-1">
            <b>Runtime:</b> {movie.runtime} mins
          </p>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
}
