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
    rate: {
      type: Number,
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
    fine: {
      type: Number,
      required: false,
      default: 0,
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
        paymentDate: {
          type: Date,
          required: false,
        },
        totalAmount: {
          type: Number,
          required: true,
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
    installmentAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
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

const Loan = mongoose.models.loan || mongoose.model("loan", loanSchema);

export default Loan;
