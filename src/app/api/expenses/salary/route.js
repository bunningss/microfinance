import mongoose from "mongoose";
import Salary from "@/lib/models/Salary";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Create salary record
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const user = await Staff.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const body = await request.json();

    const newSalary = new Salary({
      staff: body.staff,
      month: body.month,
      amount: body.amount,
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
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const salaries = await Salary.find().populate("staff", "name");

    return NextResponse.json(
      { msg: "Data found.", payload: salaries },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}