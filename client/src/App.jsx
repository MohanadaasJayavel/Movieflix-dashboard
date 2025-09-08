import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-[100vw]">
      {/* 🔹 Fixed Nav Bar */}
      <nav className="w-full p-4 bg-blue-200 text-white flex justify-between sticky top-0 z-20 shadow">
        <Link to="/" className="font-bold text-lg">
          MovieFlix
        </Link>
        <div>
          <Link to="/" className="mx-2">
            Home
          </Link>
          <Link to="/stats" className="mx-2">
            Stats
          </Link>
        </div>
      </nav>

      {/* 🔹 Main content routes */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
}
