import Deposit from "@/lib/models/Deposit";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { formatDate } from "@/utils/helpers";
import { updateDailyBalance } from "@/utils/update-daily-balance";

// Create new deposit
export async function POST(request) {
  try {
    await connectDb();
    const { id } = await verifyToken(request, "add:deposit");

    const { title, description, amount, date } = await request.json();

    if (!Number(amount))
      return NextResponse.json({ msg: "টাকার পরিমান ভুল" }, { status: 400 });

    const newDeposit = new Deposit({
      title,
      amount,
      description,
      date: formatDate(date),
      addedBy: id,
    });

    await newDeposit.save();
    await updateDailyBalance("plus", amount, date);

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}

// Get all deposits
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:deposit");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const currentDate = date ? formatDate(date) : formatDate(new Date());
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

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
