import mongoose from "mongoose";
import Salary from "@/lib/models/Salary";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { updateDailyBalance } from "@/utils/update-daily-balance";

// Create salary record
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "add:salary");

    const body = await request.json();

    const existingSalary = await Salary.findOne({
      staff: body.staff,
      month: body.month,
    }).collation({
      locale: "en",
      strength: 2,
    });

    if (existingSalary)
      return NextResponse.json(
        { msg: `ইতিমধ্যে ${body.month} বেতন প্রদান করা হয়েছে` },
        { status: 400 }
      );

    const newSalary = new Salary({
      staff: body.staff,
      month: body.month,
      amount: body.amount,
      addedBy: id,
      paymentDate: new Date(body.paymentDate),
    });

    await newSalary.save({ session });

    await Staff.findByIdAndUpdate(
      body.staff,
      {
        $push: { payments: newSalary._id },
      },
      {
        new: true,
        session,
      }
    );

    await updateDailyBalance("minus", body.amount, body.paymentDate, session);

    await session.commitTransaction();

    return NextResponse.json({ msg: "তথ্য সফলভাবে সংরক্ষিত" }, { status: 200 });
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}

// Get all salary records
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:salary");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    let query = {};

    if (date) {
      const currentDate = new Date(date);
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const salaries = await Salary.find(query)
      .populate("staff", "name")
      .populate("addedBy", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: salaries },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
