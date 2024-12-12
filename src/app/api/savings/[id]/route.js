import Savings from "@/lib/models/Savings";
import Staff from "@/lib/models/Staff";
import Member from "@/lib/models/Member";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Fetch single savings data
export async function GET(request, { params }) {
  try {
    await connectDb();
    await verifyToken(request, "view:saving");

    const savings = await Savings.findById(params.id)
      .populate("owner")
      .populate("approvedBy", "name")
      .lean();

    return NextResponse.json(
      { msg: "Data Found", payload: savings },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
