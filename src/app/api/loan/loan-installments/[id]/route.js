import Member from "@/lib/models/Member";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request, { params }) {
  try {
    await connectDb();

    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const user = await Staff.findById(id);
    if (
      user.role !== "admin" &&
      user.role !== "marketing officer" &&
      user.role !== "staff"
    )
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const member = await Member.aggregate([
      { $match: { nidNumber: params.id } },
      {
        $lookup: {
          from: "loans",
          localField: "loans",
          foreignField: "_id",
          as: "loans",
        },
      },
      {
        $addFields: {
          loans: {
            $filter: {
              input: "$loans",
              as: "loanItem",
              cond: { $eq: ["$$loanItem.loanStatus", "incomplete"] },
            },
          },
        },
      },
      {
        $addFields: {
          loans: {
            $map: {
              input: "$loans",
              as: "loanItem",
              in: {
                _id: "$$loanItem._id",
                loanName: "$$loanItem.loanName",
                loanType: "$$loanItem.loanType",
                loanAmount: "$$loanItem.loanAmount",
                repayAmount: "$$loanItem.repayAmount",
                paidAmount: "$$loanItem.amountPaid",
                loanDuration: "$$loanItem.loanDuration",
                startDate: "$$loanItem.startDate",
                endDate: "$$loanItem.endDate",
                loanStatus: "$$loanItem.loanStatus",
                installmentAmount: "$$loanItem.installmentAmount",
                rate: "$$loanItem.rate",
                installments: {
                  $filter: {
                    input: "$$loanItem.installments",
                    as: "installment",
                    cond: { $eq: ["$$installment.status", "unpaid"] },
                  },
                },
              },
            },
          },
        },
      },
    ]);
    if (!member.length) {
      return NextResponse.json(
        { msg: "কোন তথ্য পাওয়া যায়নি." },
        { status: 404 }
      );
    }

    if (!member[0].loans.length) {
      return NextResponse.json(
        { msg: "কোন তথ্য পাওয়া যায়নি." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: member[0] },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
