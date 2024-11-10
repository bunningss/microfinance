import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema({
  savingsType: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  savingsAmount: {
    type: Number,
    required: true,
  },
  savingsDuration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
});

const Savings =
  mongoose.models.savings || mongoose.model("savings", savingsSchema);

export default Savings;
