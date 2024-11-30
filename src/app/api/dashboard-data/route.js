import Loan from "@/lib/models/Loan";
import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request) {
  try {
    await verifyToken(request, "view:dashboard-data");

    const [
      totalMembers,
      { totalLoans, repayableLoans, loanRepaid },
      { totalSavings },
      { currentAmountByMembers },
    ] = await Promise.all([
      Member.countDocuments(),
      Loan.aggregate([
        {
          $group: {
            _id: null,
            totalLoans: { $sum: "$loanAmount" },
            repayableLoans: { $sum: "$repayAmount" },
            loanRepaid: { $sum: "$amountPaid" },
          },
        },
      ]).then(
        (result) =>
          result[0] || { totalLoans: 0, repayableLoans: 0, loanRepaid: 0 }
      ),
      Savings.aggregate([
        {
          $group: {
            _id: null,
            totalSavings: { $sum: "$amountSaved" },
          },
        },
      ]).then((result) => result[0] || { totalSavings: 0 }),
      Member.aggregate([
        {
          $group: {
            _id: null,
            currentAmountByMembers: { $sum: "$totalSaved" },
          },
        },
      ]).then((result) => result[0] || { currentAmountByMembers: 0 }),
    ]);

    return NextResponse.json(
      {
        msg: "Data Found.",
        payload: {
          totalMembers,
          totalLoans,
          repayableLoans,
          loanRepaid,
          totalSavings,
          currentAmountByMembers,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
