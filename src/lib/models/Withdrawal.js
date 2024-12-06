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
  },
  {
    timestamps: true,
  }
);

const Withdrawal =
  mongoose.models?.withdrawal || mongoose.model("withdrawal", withdrawalSchema);

export default Withdrawal;
