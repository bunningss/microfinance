import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema(
  {
    savingsName: {
      type: String,
      required: true,
    },
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
    endDate: {
      type: Date,
      required: true,
    },
    savingsStatus: {
      type: String,
      required: true,
      default: "incomplete",
      enum: ["complete", "incomplete"],
    },
    installments: [
      {
        date: {
          type: Date,
          required: true,
        },
        paymentDate: {
          type: Date,
          required: false,
        },
        status: {
          type: String,
          required: true,
          default: "unpaid",
          enum: ["paid", "unpaid"],
        },
        amount: {
          type: Number,
          required: true,
        },
        receivedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "staff",
          required: false,
        },
      },
    ],
    amountSaved: {
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Savings =
  mongoose.models.savings || mongoose.model("savings", savingsSchema);

export default Savings;
