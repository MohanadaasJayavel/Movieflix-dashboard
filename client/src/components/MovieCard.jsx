import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <img
        src={movie.poster || "https://via.placeholder.com/150"}
        alt={movie.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
      <p className="text-sm">Year: {movie.year}</p>
      <p className="text-sm">Rating: {movie.rating || "N/A"}</p>
      <Link
        to={`/movies/${movie._id}`}
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
