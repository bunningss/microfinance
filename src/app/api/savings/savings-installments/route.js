import mongoose from "mongoose";
import Savings from "@/lib/models/Savings";
import Member from "@/lib/models/Member";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { updateDailyBalance } from "@/utils/update-daily-balance";
import { formatDate, setTimezone } from "@/utils/helpers";

// Pay savings installment
export async function PUT(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "update:saving-installment");

    const { installmentId, date } = await request.json();

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
    installment.paymentDate = setTimezone(date); // Update to current date once they finish adding old data.
    savings.amountSaved += installment.amount;

    const allPaid = savings.installments.every(
      (inst) => inst.status === "paid"
    );

    if (allPaid) {
      savings.savingsStatus = "complete";
    }

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
    await updateDailyBalance("plus", installment.amount, date, session);

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

// Get savings installments (Today by default)
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:saving-installments");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const { startOfDay, endOfDay } = formatDate(date);

    const results = await Savings.aggregate([
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
          savingsName: 1,
          savingsAmount: 1,
          savingsType: 1,
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
