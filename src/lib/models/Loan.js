import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    loanName: {
      type: String,
      required: true,
    },
    loanType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    repayAmount: {
      type: Number,
      required: true,
    },
    loanDuration: {
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
    loanStatus: {
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
        amountPerInstallment: {
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
    amountPaid: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.models.loan || mongoose.model("loan", loanSchema);

export default Loan;
