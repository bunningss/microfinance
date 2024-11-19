import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense =
  mongoose.models?.expense || mongoose.model("expense", expenseSchema);

export default Expense;
