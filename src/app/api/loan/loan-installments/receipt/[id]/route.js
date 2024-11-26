import Member from "@/lib/models/Member";
import Loan from "@/lib/models/Loan";
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
    if (user.role !== "admin" && user.role !== "marketing officer")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    // Find the savings document
    const loan = await Loan.findOne({
      "installments._id": params.id,
    })
      .populate("installments.receivedBy", "name")
      .lean();

    if (!loan) {
      return NextResponse.json({ msg: "ঋণ পাওয়া যায়নি." }, { status: 404 });
    }

    // Find exact installment
    const installment = loan.installments.find(
      (inst) => inst._id.toString() === params.id
    );

    const paidInstallments = loan.installments.filter(
      (inst) => inst.status === "paid"
    ).length;

    if (!installment) {
      return NextResponse.json(
        { msg: "কিস্তি পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    // Find owner
    const loanOwner = await Member.findById(loan.owner)
      .select("name phone nidNumber")
      .lean();

    if (!loanOwner) {
      return NextResponse.json(
        { msg: "মালিক পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        msg: "তথ্য পাওয়া গেছে।",
        loan,
        owner: loanOwner,
        installment,
        totalInstallments: loan.installments.length,
        paidInstallments,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
