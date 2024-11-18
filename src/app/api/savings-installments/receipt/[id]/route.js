import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
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
    const savings = await Savings.findOne({
      "installments._id": params.id,
    }).lean();

    if (!savings) {
      return NextResponse.json({ msg: "Savings not found." }, { status: 404 });
    }

    // Find exact installment
    const installment = savings.installments.find(
      (inst) => inst._id.toString() === params.id
    );

    const paidInstallments = savings.installments.filter(
      (inst) => inst.status === "paid"
    ).length;

    if (!installment) {
      return NextResponse.json(
        { msg: "Installment not found." },
        { status: 404 }
      );
    }

    // Find owner
    const savingsOwner = await Member.findById(savings.owner)
      .select("name phone nidNumber totalSaved")
      .lean();

    if (!savingsOwner) {
      return NextResponse.json({ msg: "Owner not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: "Data found.",
        savings,
        owner: savingsOwner,
        installment,
        totalInstallments: savings.installments.length,
        paidInstallments,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
