import Deposit from "@/lib/models/Deposit";
import mongoose from "mongoose";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { updateDailyBalance } from "@/utils/update-daily-balance";
import { formatDate, setTimezone } from "@/utils/helpers";

// Create new deposit
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = await verifyToken(request, "add:deposit");

    const { title, description, amount, date } = await request.json();

    if (!Number(amount))
      return NextResponse.json({ msg: "টাকার পরিমান ভুল" }, { status: 400 });

    const newDeposit = new Deposit({
      title,
      amount,
      description,
      date: setTimezone(date),
      addedBy: id,
    });

    await newDeposit.save({ session });
    await updateDailyBalance("plus", amount, date, session);

    await session.commitTransaction();

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}

// Get all deposits
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:deposit");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const { startOfDay, endOfDay } = formatDate(date);

    const deposits = await Deposit.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .sort({ date: -1 })
      .populate("addedBy", "name")
      .lean();

    return NextResponse.json({ msg: "Data found.", payload: deposits });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
