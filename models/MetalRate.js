import mongoose from "mongoose";

const metalRateSchema = new mongoose.Schema(
  {
    metal: { type: String, required: true },
    purity: { type: String, required: true },
    rate: { type: Number, required: true }
  },
  { timestamps: true }   // ✅ adds createdAt & updatedAt automatically
);

const MetalRate = mongoose.model("MetalRate", metalRateSchema);
export default MetalRate;
