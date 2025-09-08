// import { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// export default function Home() {
//   const [query, setQuery] = useState("");
//   //   const genreOptions = [
//   //     "Action",
//   //     "Adventure",
//   //     "Comedy",
//   //     "Drama",
//   //     "Sci-Fi",
//   //     "Thriller",
//   //     "Romance",
//   //     "Horror",
//   //   ];
//   //   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [sort, setSort] = useState("rating");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(12);

//   const [state, setState] = useState({
//     data: [],
//     total: 0,
//     loading: false,
//     error: "",
//   });

//   //   const filterParam = useMemo(() => {
//   //     if (!selectedGenres.length) return "";
//   //     return `&filter=genre:${selectedGenres.join(",")}`;
//   //   }, [selectedGenres]);

//   const fetchMovies = async () => {
//     if (!query.trim()) {
//       setState({
//         data: [],
//         total: 0,
//         loading: false,
//         error: "Please enter a search term.",
//       });
//       return;
//     }

//     setState((s) => ({ ...s, loading: true, error: "" }));
//     try {
//       const url = `${API_BASE}/movies?search=${encodeURIComponent(
//         query
//       )}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`;
//       const res = await axios.get(url);
//       setState({
//         data: res.data.data || [],
//         total: res.data.total || 0,
//         loading: false,
//         error: "",
//       });
//     } catch (e) {
//       setState({
//         data: [],
//         total: 0,
//         loading: false,
//         error: e.response?.data?.error || "Failed to fetch movies",
//       });
//     }
//   };

//   //   useEffect(() => {
//   //     if (query) fetchMovies();
//   //     // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   }, [page, sort, order, selectedGenres]);

//   const totalPages = Math.max(1, Math.ceil(state.total / limit));

//   return (
//     <div className="flex flex-col h-screen">
//       {/* 🔹 Fixed Search/Filter Header */}
//       <div className="p-4 bg-white shadow sticky top-16 z-10">
//         <div className="flex flex-col md:flex-row gap-2 mb-3">
//           <input
//             className="border p-2 flex-1"
//             placeholder="Search movies..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && (setPage(1), fetchMovies())}
//           />
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={() => (setPage(1), fetchMovies())}
//           >
//             Search
//           </button>
//           {/* </div>

//         <div className="flex flex-wrap items-center gap-3"> */}
//           <div className="flex items-center gap-2">
//             <label className="text-sm">Sort by</label>
//             <select
//               className="border p-2"
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//             >
//               <option value="rating">Rating</option>
//               <option value="year">Year</option>
//               <option value="runtime">Runtime</option>
//               <option value="title">Title</option>
//             </select>
//             <select
//               className="border p-2"
//               value={order}
//               onChange={(e) => setOrder(e.target.value)}
//             >
//               <option value="desc">Desc</option>
//               <option value="asc">Asc</option>
//             </select>
//           </div>

//           {/* <div className="flex items-center gap-2">
//             <label className="text-sm">Genres</label>
//             <select
//               className="border p-2"
//               multiple
//               value={selectedGenres}
//               onChange={(e) =>
//                 setSelectedGenres(
//                   Array.from(e.target.selectedOptions, (o) => o.value)
//                 )
//               }
//             >
//               {genreOptions.map((g) => (
//                 <option key={g} value={g}>
//                   {g}
//                 </option>
//               ))}
//             </select>
//           </div> */}
//         </div>
//       </div>

//       {/* 🔹 Scrollable Results */}
//       <div className="flex-1 overflow-y-auto p-12 mt-2">
//         {state.error && (
//           <div className="p-3 bg-red-100 text-red-800 rounded">
//             {state.error}
//           </div>
//         )}

//         {state.loading ? (
//           <div className="p-6">Loading…</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {state.data.map((m) => (
//                 <div
//                   key={m.imdbID}
//                   className="border bg-white rounded shadow overflow-hidden"
//                 >
//                   <Link to={`/movies/${m.imdbID}`}>
//                     <img
//                       src={m.poster}
//                       alt={m.title}
//                       className="h-60 w-full object-cover"
//                     />
//                   </Link>
//                   <div className="p-2 space-y-1">
//                     <h2 className="font-semibold text-sm line-clamp-2">
//                       {m.title}
//                     </h2>
//                     <p className="text-xs text-gray-600">{m.year || "-"}</p>
//                     <p className="text-xs">⭐ {m.rating ?? "-"}</p>
//                     <a
//                       className="text-xs text-blue-600 underline"
//                       href={m.imdbUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       IMDb
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-center gap-2 mt-4">
//               <button
//                 disabled={page <= 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//                 onClick={() => setPage((p) => p - 1)}
//               >
//                 Prev
//               </button>
//               <span className="text-sm">
//                 Page {page} / {totalPages}
//               </span>
//               <button
//                 disabled={page >= totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//                 onClick={() => setPage((p) => p + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [state, setState] = useState({
    data: [],
    total: 0,
    loading: false,
    error: "",
  });

  const fetchMovies = async () => {
    if (!query.trim()) {
      setState({
        data: [],
        total: 0,
        loading: false,
        error: "Please enter a search term.",
      });
      return;
    }

    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const url = `${API_BASE}/movies?search=${encodeURIComponent(
        query
      )}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`;
      const res = await axios.get(url);
      setState({
        data: res.data.data || [],
        total: res.data.total || 0,
        loading: false,
        error: "",
      });
    } catch (e) {
      setState({
        data: [],
        total: 0,
        loading: false,
        error: e.response?.data?.error || "Failed to fetch movies",
      });
    }
  };

  useEffect(() => {
    if (query) fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, order]);

  const totalPages = Math.max(1, Math.ceil(state.total / limit));

  const downloadCSV = () => {
    if (!state.data.length) {
      alert("No movies to download!");
      return;
    }

    const rows = state.data.map(
      ({ title, year, rating, runtime, imdbID, genre }) => ({
        title,
        year,
        rating,
        runtime,
        imdbID,
        genre: genre ? genre.join("; ") : "",
      })
    );

    const csvContent = [
      ["Title", "Year", "Rating", "Runtime", "IMDb ID", "Genres"].join(","),
      ...rows.map((r) =>
        [r.title, r.year, r.rating, r.runtime, r.imdbID, r.genre].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `movies_page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 🔹 Fixed Search/Filter Header */}
      <div className="p-4 bg-white shadow sticky top-16 z-10">
        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <input
            className="border p-2 flex-1"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (setPage(1), fetchMovies())}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => (setPage(1), fetchMovies())}
          >
            Search
          </button>

          <div className="flex items-center gap-2 ml-2">
            <label className="text-sm">Sort by</label>
            <select
              className="border p-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="runtime">Runtime</option>
              <option value="title">Title</option>
            </select>
            <select
              className="border p-2"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          {/* Download CSV Button */}
          <button
            className="ml-auto mt-2 md:mt-0 px-3 py-2 border rounded bg-green-500 text-white hover:bg-green-600"
            onClick={downloadCSV}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* 🔹 Scrollable Results */}
      <div className="flex-1 overflow-y-auto p-12 mt-2">
        {state.error && (
          <div className="p-3 bg-red-100 text-red-800 rounded">
            {state.error}
          </div>
        )}

        {state.loading ? (
          <div className="p-6">Loading…</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {state.data.map((m) => (
                <div
                  key={m.imdbID}
                  className="border bg-white rounded shadow overflow-hidden"
                >
                  <Link to={`/movies/${m.imdbID}`}>
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="h-60 w-full object-cover"
                    />
                  </Link>
                  <div className="p-2 space-y-1">
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {m.title}
                    </h2>
                    <p className="text-xs text-gray-600">{m.year || "-"}</p>
                    <p className="text-xs">⭐ {m.rating ?? "-"}</p>
                    <a
                      className="text-xs text-blue-600 underline"
                      href={m.imdbUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      IMDb
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                disabled={page <= 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span className="text-sm">
                Page {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
