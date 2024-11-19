import Expense from "@/lib/models/Expense";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id).lean();
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const body = await request.json();

    const newExpense = new Expense({
      name: body.name,
      description: body.description,
      amount: body.amount,
      date: body.date,
      addedBy: id,
    });

    await newExpense.save();

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
