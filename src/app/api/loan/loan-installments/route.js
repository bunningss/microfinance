import Loan from "@/lib/models/Loan";
import mongoose from "mongoose";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Get loan installments (Today by default)
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:loan-installments");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const currentDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const results = await Loan.aggregate([
      { $unwind: "$installments" },
      {
        $match: {
          "installments.date": { $gte: startOfDay, $lte: endOfDay },
          "installments.status": "unpaid",
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "owner",
          foreignField: "_id",
          as: "memberDetails",
        },
      },
      { $unwind: "$memberDetails" },
      {
        $project: {
          _id: 0,
          "memberDetails.name": 1,
          "memberDetails.phone": 1,
          "memberDetails.nidNumber": 1,
          loanName: 1,
          loanAmount: 1,
          loanType: 1,
          installments: [
            {
              date: "$installments.date",
              _id: "$installments._id",
              amount: "$installments.amount",
            },
          ],
        },
      },
    ]);

    if (!results.length)
      return NextResponse.json(
        { msg: "কিস্তি পাওয়া যায় নি" },
        { status: 404 }
      );

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: results },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}

// Pay loan installment
export async function PUT(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "update:loan-installment");

    const { installmentId } = await request.json();

    if (!installmentId) {
      return NextResponse.json(
        { msg: "কিস্তি নির্বাচন করুন" },
        { status: 400 }
      );
    }

    const loan = await Loan.findOne({
      "installments._id": installmentId,
    });

    if (!loan) {
      return NextResponse.json(
        { msg: "কিস্তি পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    const installment = loan.installments.id(installmentId);

    if (!installment) {
      return NextResponse.json(
        { msg: "সঞ্চয়পত্রে কিস্তি পাওয়া যায়নি" },
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
    installment.paymentDate = new Date(Date.now());
    loan.amountPaid += installment.amount;

    const allPaid = loan.installments.every((inst) => inst.status === "paid");

    if (allPaid) {
      loan.loanStatus = "complete";
    }

    await loan.save({ session });

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
