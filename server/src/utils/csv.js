export function toCSV(items = []) {
  if (!items.length) return "";
  const headers = [
    "imdbID",
    "title",
    "year",
    "genre",
    "director",
    "actors",
    "rating",
    "runtime",
    "poster",
    "plot",
    "website",
  ];
  const rows = items.map((m) =>
    [
      m.imdbID,
      escapeCSV(m.title),
      m.year ?? "",
      (m.genre || []).join("|"),
      escapeCSV(m.director || ""),
      (m.actors || []).join("|"),
      m.rating ?? "",
      m.runtime ?? "",
      m.poster || "",
      escapeCSV(m.plot || ""),
      m.website || "",
    ].join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function escapeCSV(v) {
  if (v == null) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
