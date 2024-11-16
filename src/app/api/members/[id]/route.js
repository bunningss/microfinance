import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDb();

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
