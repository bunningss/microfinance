import mongoose from "mongoose";
import Savings from "@/lib/models/Savings";
import Member from "@/lib/models/Member";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function PUT(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const user = await Staff.findById(id);
    if (user.role !== "admin" && user.role !== "marketing officer")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const { installmentId } = await request.json();

    if (!installmentId) {
      return NextResponse.json(
        { msg: "Installment ID is required" },
        { status: 400 }
      );
    }

    const savings = await Savings.findOne({
      "installments._id": installmentId,
    });

    if (!savings) {
      return NextResponse.json(
        { msg: "Installment not found" },
        { status: 404 }
      );
    }

    const installment = savings.installments.id(installmentId);

    if (!installment) {
      return NextResponse.json(
        { msg: "Installment not found in savings" },
        { status: 404 }
      );
    }

    if (installment.status === "paid") {
      return NextResponse.json(
        { msg: "Installment is already paid" },
        { status: 400 }
      );
    }

    installment.status = "paid";
    savings.amountSaved += installment.amount;

    await Member.findByIdAndUpdate(
      savings.owner,
      {
        $inc: { totalSaved: installment.amount },
      },
      {
        new: true,
        session,
      }
    );

    await savings.save({ session });

    await session.commitTransaction();
    return NextResponse.json({
      msg: "Installment paid successfully.",
    });
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 500 });
  } finally {
    session.endSession();
  }
}
