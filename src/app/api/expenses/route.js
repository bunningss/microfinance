import Expense from "@/lib/models/Expense";
import mongoose from "mongoose";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { updateDailyBalance } from "@/utils/update-daily-balance";
import { formatDate, setTimezone } from "@/utils/helpers";

// Add new expense
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "add:expense");

    const body = await request.json();

    const newExpense = new Expense({
      name: body.name,
      description: body.description,
      amount: body.amount,
      date: setTimezone(body.date),
      addedBy: id,
    });

    await newExpense.save({ session });
    await updateDailyBalance("minus", body.amount, body.date, session);

    await session.commitTransaction();

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
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

    const { startOfDay, endOfDay } = formatDate(date);
    query.date = { $gte: startOfDay, $lte: endOfDay };

    const expenses = await Expense.find(query)
      .sort({ createdAt: -1 })
      .populate("addedBy", "name")
      .lean()
      .exec();

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: expenses },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
