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
        { msg: "কিস্তি আইডি প্রদান করুন" },
        { status: 400 }
      );
    }

    const savings = await Savings.findOne({
      "installments._id": installmentId,
    });

    if (!savings) {
      return NextResponse.json(
        { msg: "কিস্তি পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    const installment = savings.installments.id(installmentId);

    if (!installment) {
      return NextResponse.json(
        { msg: "সঞ্চয়পত্রে কিস্তি পাওয়া যায় না" },
        { status: 404 }
      );
    }

    if (installment.status === "paid") {
      return NextResponse.json(
        { msg: "কিস্তি ইতিমধ্যে পরিশোধ করা হয়েছে" },
        { status: 400 }
      );
    }

    // Update savings properties
    installment.status = "paid";
    installment.receivedBy = id;
    savings.amountSaved += installment.amount;

    // Update user total saved money
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
      msg: "সফলভাবে কিস্তি পরিশোধ করা হয়েছে।",
    });
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 500 });
  } finally {
    session.endSession();
  }
}
