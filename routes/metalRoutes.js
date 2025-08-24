import express from "express";
import MetalRate from "../models/MetalRate.js";

const router = express.Router();

// Save new metal rate
router.post("/", async (req, res) => {
  try {
    const newRate = new MetalRate(req.body);
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all rates
router.get("/", async (req, res) => {
  try {
    const rates = await MetalRate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/seed", async (req, res) => {
  try {
    await MetalRate.deleteMany(); // old data remove
    await MetalRate.insertMany([
      { metal: "Gold", purity: "24K", rate: 6800 },
      { metal: "Gold", purity: "22K", rate: 6400 },
      { metal: "Silver", purity: "999", rate: 80 },
    ]);
    res.send("Seed data inserted ✅");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
