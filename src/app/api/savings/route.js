import mongoose from "mongoose";
import Staff from "@/lib/models/Staff";
import Savings from "@/lib/models/Savings";
import Member from "@/lib/models/Member";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { generateInstallments, generateSavingsName } from "@/utils/helpers";

// create new savings
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

    let savingsName;

    do {
      savingsName = generateSavingsName();
    } while (
      await Savings.findOne({ owner: body.owner, savingsName: savingsName })
    );

    // Generate user installments
    const installments = generateInstallments(
      new Date(body.startDate).toISOString(),
      body.savingsType,
      parseInt(body.savingsDuration),
      parseInt(body.savingsAmount)
    );

    const newSavings = new Savings({
      savingsName,
      savingsStatus: "incomplete",
      savingsType: body.savingsType,
      savingsAmount: body.savingsAmount,
      savingsDuration: body.savingsDuration,
      startDate: body.startDate,
      endDate: installments.at(-1).date,
      owner: body.owner,
      installments,
    });

    await Member.findByIdAndUpdate(
      body.owner,
      {
        $push: { savings: newSavings._id },
      },
      {
        new: true,
        session,
      }
    );

    await newSavings.save({ session });
    await session.commitTransaction();

    return NextResponse.json(
      { msg: "নতুন সঞ্চয় সফলভাবে তৈরি হয়েছে" },
      { status: 200 }
    );
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}
