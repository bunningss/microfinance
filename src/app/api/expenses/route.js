import Expense from "@/lib/models/Expense";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Add new expense
export async function POST(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id).lean();
    if (
      user.role !== "admin" &&
      user.role !== "marketing officer" &&
      user.role !== "staff"
    )
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

// Get all expense
export async function GET(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id).lean();
    if (
      user.role !== "admin" &&
      user.role !== "marketing officer" &&
      user.role !== "staff"
    )
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const expenses = await Expense.find()
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
