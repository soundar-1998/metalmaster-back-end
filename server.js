import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import metalRoutes from "./routes/metalRoutes.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();   // ✅ first app create pannu

// Middleware
app.use(cors());         // ✅ cors use here (after app created)
app.use(express.json());

// Routes
app.use("/api/metals", metalRoutes);
app.use("/api/auth", authRoutes);

// Default test
app.get("/", (req, res) => {
  res.send("✅ API working");
});

// Temporary profile API
app.get("/api/profile", (req, res) => {
  res.json({ username: "kannan", email: "kannan@gamil.com" });
});

// Mongo connect
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
