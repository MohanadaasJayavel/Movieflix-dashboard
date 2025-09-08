export function normalizeOmdbDetail(raw) {
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const runtimeMinutes = (() => {
    if (!raw?.Runtime) return undefined;
    const m = raw.Runtime.match(/(\d+)/);
    return m ? Number(m[1]) : undefined;
  })();

  return {
    imdbID: raw.imdbID,
    title: raw.Title || "",
    year: toNum(raw.Year),
    genre: raw.Genre ? raw.Genre.split(",").map((s) => s.trim()) : [],
    director: raw.Director || "",
    actors: raw.Actors ? raw.Actors.split(",").map((s) => s.trim()) : [],
    rating:
      raw.imdbRating && raw.imdbRating !== "N/A"
        ? Number(raw.imdbRating)
        : undefined,
    runtime: runtimeMinutes,
    poster: raw.Poster && raw.Poster !== "N/A" ? raw.Poster : undefined,
    plot: raw.Plot && raw.Plot !== "N/A" ? raw.Plot : undefined,
    website: raw.Website && raw.Website !== "N/A" ? raw.Website : undefined,
    fetchedAt: new Date(),
  };
}
