import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import Loan from "@/lib/models/Loan";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

// Get member data
export async function GET(request, { params }) {
  try {
    await verifyToken(request, "view:member");

    const member = await Member.findOne({ nidNumber: params.id })
      .populate({
        path: "savings",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "approvedBy",
          select: "name role phone",
        },
      })
      .populate({
        path: "loans",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "approvedBy",
          select: "name role phone",
        },
      });

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
