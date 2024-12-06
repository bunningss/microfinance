import mongoose from "mongoose";
import Withdrawal from "@/lib/models/Withdrawal";
import Member from "@/lib/models/Member";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// New Withdrawal
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "add:withdrawal");

    const { amount, userId, comment } = await request.json();

    if (!Number(amount))
      return NextResponse.json({ msg: "টাকার পরিমান ভুল" }, { status: 400 });

    if (amount <= 0)
      return NextResponse.json({ msg: "টাকার পরিমান ভুল" }, { status: 400 });

    const member = await Member.findById(userId);
    if (!member)
      return NextResponse.json(
        { msg: "সদস্য নির্বাচন সঠিক নয়" },
        { status: 400 }
      );

    if (member.totalSaved < amount)
      return NextResponse.json(
        { msg: "একাউন্ট এ যথেষ্ট পরিমান টাকা নেই" },
        { status: 400 }
      );

    const newWithdrawal = new Withdrawal({
      amount,
      owner: userId,
      comment,
      approvedBy: id,
    });

    member.totalSaved -= amount;
    member.withdrawals.push(newWithdrawal._id);

    await member.save({ session });
    await newWithdrawal.save({ session });

    await session.commitTransaction();

    return NextResponse.json(
      { msg: "টাকা উত্তোলন সম্পন্ন হয়েছে" },
      { status: 200 }
    );
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}
