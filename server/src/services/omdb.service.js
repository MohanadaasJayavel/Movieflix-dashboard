import axios from "axios";
const OMDB_BASE = "https://www.omdbapi.com/";

function isStale(movieDoc) {
  if (!movieDoc?.fetchedAt) return true;
  return Date.now() - new Date(movieDoc.fetchedAt).getTime() > CACHE_TTL_MS;
}

export async function fetchAndCacheById(imdbID) {
  let existing = await Movie.findOne({ imdbID });
  if (existing && !isStale(existing)) return existing;

  const { data } = await axios.get(OMDB_BASE, {
    params: { apikey: OMDB_API_KEY, i: imdbID, plot: "full" },
  });
  if (data?.Response === "False") throw new Error(data?.Error || "OMDb error");
  const normalized = normalizeOmdbDetail(data);

  existing = await Movie.findOneAndUpdate(
    { imdbID: normalized.imdbID },
    { $set: normalized },
    { upsert: true, new: true }
  );

  return existing;
}

export async function searchAndWarmCache(query, page = 1) {
  const { data } = await axios.get(OMDB_BASE, {
    params: { apikey: OMDB_API_KEY, s: query, page },
  });
  if (data?.Response === "False") return { total: 0, items: [] };

  const ids = (data.Search || []).map((x) => x.imdbID);
  const details = await Promise.all(
    ids.map((id) => fetchAndCacheById(id).catch(() => null))
  );
  const items = details.filter(Boolean);
  const total = Number(data.totalResults || items.length);
  return { total, items };
}
