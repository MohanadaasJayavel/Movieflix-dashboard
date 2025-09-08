import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        🎬 MovieFlix
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/stats" className="hover:underline">
          Stats
        </Link>
      </div>
    </nav>
  );
}
