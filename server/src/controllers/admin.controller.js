import Movie from "../models/Movie.js";

// DELETE /api/admin/cache – purge stale cache (>24h) or all if ?all=true
export async function purgeCache(req, res) {
  const all = req.query.all === "true";
  if (all) {
    const r = await Movie.deleteMany({});
    return res.json({ deleted: r.deletedCount });
  }
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const r = await Movie.deleteMany({ fetchedAt: { $lt: cutoff } });
  res.json({ deleted: r.deletedCount });
}
