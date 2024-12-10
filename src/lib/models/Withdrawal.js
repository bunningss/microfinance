import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
    },
    comment: {
      type: String,
      required: false,
    },
    withdrawalDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Withdrawal =
  mongoose.models?.withdrawal || mongoose.model("withdrawal", withdrawalSchema);

export default Withdrawal;
