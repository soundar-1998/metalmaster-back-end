
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.js"; // ✅ import it
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PROFILE (protected route)
router.get("/profile", async (req, res) => {
  try {
    // Dummy for now
    res.json({ username: "Soundar", email: "soundar@test.com" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});//upateProfile
router.put("/profile", authenticateToken, async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, // token la irukra logged-in user id
      { username, email },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});
//deleted
router.delete("/delete", authenticateToken, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ msg: "User ID required" });

  if (req.user.id !== id) {
    return res.status(403).json({ msg: "Not allowed" }); // Ippo error varudhu
  }

  await User.findByIdAndDelete(id);
  res.json({ msg: "Account deleted successfully" });
});
  
export default router;
