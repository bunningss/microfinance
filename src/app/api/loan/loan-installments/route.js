import Loan from "@/lib/models/Loan";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Get loan installments (Today by default)
export async function GET(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();

    const user = await Staff.findById(id);
    if (
      user.role !== "admin" &&
      user.role !== "marketing officer" &&
      user.role !== "staff"
    )
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

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
              amountPerInstallment: "$installments.amountPerInstallment",
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
