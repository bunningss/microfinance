import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import Staff from "@/lib/models/Staff";

export async function GET(request, { params }) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();

    const user = await Staff.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const member = await Member.findOne({ nidNumber: params.id }).populate(
      "savings"
    );
    if (!member) {
      return NextResponse.json({ msg: "Data not found." }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Data Found.", payload: member },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
