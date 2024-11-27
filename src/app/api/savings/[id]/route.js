import Staff from "@/lib/models/Staff";
import Savings from "@/lib/models/Savings";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Fetch single loan data
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

    const savings = await Savings.findById(params.id);

    return NextResponse.json(
      { msg: "Data Found", payload: savings },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
