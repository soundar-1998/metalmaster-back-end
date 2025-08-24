import mongoose from "mongoose";

const metalRateSchema = new mongoose.Schema({
  metal: { type: String, required: true },   // e.g., Gold, Silver
  purity: { type: String, required: true },  // e.g., 24K, 22K, 999
  rate: { type: Number, required: true },    // per gram
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.MetalRate || mongoose.model("MetalRate", metalRateSchema);
// middleware/auth.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = user; // attach user info to request
    next();
  });
};
