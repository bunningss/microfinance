import Expense from "@/lib/models/Expense";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { updateDailyBalance } from "@/utils/update-daily-balance";

// Add new expense
export async function POST(request) {
  try {
    await connectDb();
    const { id } = await verifyToken(request, "add:expense");

    const body = await request.json();

    const newExpense = new Expense({
      name: body.name,
      description: body.description,
      amount: body.amount,
      date: new Date(body.date),
      addedBy: id,
    });

    await newExpense.save();
    await updateDailyBalance("minus", body.amount, body.date);

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}

// Get all expense
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:expense");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    let query = {};

    if (date) {
      const currentDate = new Date(date);
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const expenses = await Expense.find(query)
      .sort({ createdAt: -1 })
      .populate("addedBy", "name")
      .lean();

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: expenses },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
