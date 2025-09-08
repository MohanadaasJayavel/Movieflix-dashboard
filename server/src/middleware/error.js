export function errorHandler(err, req, res, next) {
  // eslint-disable-line
  console.error("❌", err.message);
  res.status(500).json({ message: err.message || "Server error" });
}
