import Member from "@/lib/models/Member";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request, { params }) {
  try {
    await connectDb();
    await verifyToken(request, "view:saving-installment");

    const member = await Member.aggregate([
      {
        $match: {
          $or: [{ nidNumber: params.id }, { memberNumber: params.id }],
        },
      },
      {
        $lookup: {
          from: "savings",
          localField: "savings",
          foreignField: "_id",
          as: "savings",
        },
      },
      {
        $addFields: {
          savings: {
            $filter: {
              input: "$savings",
              as: "savingsItem",
              cond: { $eq: ["$$savingsItem.savingsStatus", "incomplete"] },
            },
          },
        },
      },
      {
        $addFields: {
          savings: {
            $map: {
              input: "$savings",
              as: "savingsItem",
              in: {
                _id: "$$savingsItem._id",
                savingsName: "$$savingsItem.savingsName",
                savingsType: "$$savingsItem.savingsType",
                savingsAmount: "$$savingsItem.savingsAmount",
                savingsDuration: "$$savingsItem.savingsDuration",
                startDate: "$$savingsItem.startDate",
                endDate: "$$savingsItem.endDate",
                savingsStatus: "$$savingsItem.savingsStatus",
                amountSaved: "$$savingsItem.amountSaved",
                installments: {
                  $filter: {
                    input: "$$savingsItem.installments",
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

    if (!member[0].savings.length) {
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
