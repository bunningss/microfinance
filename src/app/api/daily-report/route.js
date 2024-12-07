import Deposit from "@/lib/models/Deposit";
import Expense from "@/lib/models/Expense";
import Withdrawal from "@/lib/models/Withdrawal";
import Savings from "@/lib/models/Savings";
import Loan from "@/lib/models/Loan";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { formatDate } from "@/utils/helpers";
import { NextResponse } from "next/server";

// Get daily report
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:daily-report");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const currentDate = date ? formatDate(date) : formatDate(new Date());
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const [
      deposits,
      expenses,
      withdrawals,
      savingsInstallments,
      loanInstallments,
    ] = await Promise.all([
      Deposit.find({ date: { $gte: startOfDay, $lte: endOfDay } })
        .populate("addedBy", "name")
        .lean(),
      Expense.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } })
        .populate("addedBy", "name")
        .lean(),
      Withdrawal.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      })
        .populate("owner", "name memberNumber phone")
        .populate("approvedBy", "name")
        .lean(),
      Savings.aggregate([
        {
          $match: {
            installments: {
              $elemMatch: {
                status: "paid",
                date: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
          },
        },
        {
          $unwind: "$installments",
        },
        {
          $match: {
            "installments.status": "paid",
            "installments.date": {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$installments.amount" },
            count: { $sum: 1 },
          },
        },
      ]),
      Loan.aggregate([
        {
          $match: {
            installments: {
              $elemMatch: {
                status: "paid",
                paymentDate: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
          },
        },
        {
          $unwind: "$installments",
        },
        {
          $match: {
            "installments.status": "paid",
            "installments.paymentDate": {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$installments.amount" },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const savingsTotal = savingsInstallments[0]
      ? savingsInstallments[0].totalAmount
      : 0;
    const savingsCount = savingsInstallments[0]
      ? savingsInstallments[0].count
      : 0;
    const loanTotal = loanInstallments[0] ? loanInstallments[0].totalAmount : 0;
    const loanCount = loanInstallments[0] ? loanInstallments[0].count : 0;

    return NextResponse.json(
      {
        msg: "Data Found.",
        payload: {
          deposits,
          expenses,
          withdrawals,
          paidInstallments: {
            savings: {
              total: savingsTotal,
              count: savingsCount,
            },
            loans: {
              total: loanTotal,
              count: loanCount,
            },
          },
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
