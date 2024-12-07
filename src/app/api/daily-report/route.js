import Deposit from "@/lib/models/Deposit";
import Expense from "@/lib/models/Expense";
import Withdrawal from "@/lib/models/Withdrawal";
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

    let query = {};

    const currentDate = date ? formatDate(date) : formatDate(new Date());
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
    query.date = { $gte: startOfDay, $lte: endOfDay };

    const [deposits, expenses, withdrawals] = await Promise.all([
      Deposit.find(query).populate("addedBy", "name").lean(),
      Expense.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } })
        .populate("addedBy", "name")
        .lean(),
      Withdrawal.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      })
        .populate("owner", "name memberNumber phone")
        .populate("approvedBy", "name")
        .lean(),
    ]);

    return NextResponse.json(
      {
        msg: "Data Found.",
        payload: {
          deposits,
          expenses,
          withdrawals,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
