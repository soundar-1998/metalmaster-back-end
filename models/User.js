
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Safe export (avoid OverwriteModelError)
export default mongoose.models.User || mongoose.model("User", userSchema);
