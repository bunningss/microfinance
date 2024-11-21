import Member from "@/lib/models/Member";
import Staff from "@/lib/models/Staff";
import Savings from "@/lib/models/Savings";
import Loan from "@/lib/models/Loan";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(request, { params }) {
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

    const member = await Member.findOne({ nidNumber: params.id })
      .populate("savings")
      .populate("loans");
    if (!member) {
      return NextResponse.json({ msg: "তথ্য পাওয়া যায়নি." }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: member },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
