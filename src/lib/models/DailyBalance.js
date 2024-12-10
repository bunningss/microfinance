import mongoose from "mongoose";

const dailyBalanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, unique: true },
    balance: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.dailyBalance ||
  mongoose.model("dailyBalance", dailyBalanceSchema);
