import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
};
