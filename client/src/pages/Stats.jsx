import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/movies/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="p-6">Loading stats...</p>;

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3">
      <div>
        <h2 className="font-bold mb-2">Genres Distribution</h2>
        <Pie
          data={{
            labels: Object.keys(stats.genreCount),
            datasets: [{ data: Object.values(stats.genreCount) }],
          }}
        />
      </div>

      <div>
        <h2 className="font-bold mb-2">Average Ratings by Genre</h2>
        <Bar
          data={{
            labels: Object.keys(stats.avgRatings),
            datasets: [
              { data: Object.values(stats.avgRatings), label: "Rating" },
            ],
          }}
        />
      </div>

      <div>
        <h2 className="font-bold mb-2">Average Runtime by Year</h2>
        <Line
          data={{
            labels: Object.keys(stats.avgRuntime),
            datasets: [
              {
                data: Object.values(stats.avgRuntime),
                label: "Runtime (mins)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
