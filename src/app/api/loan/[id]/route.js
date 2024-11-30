import Loan from "@/lib/models/Loan";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Fetch single loan data
export async function GET(request, { params }) {
  try {
    await connectDb();
    await verifyToken(request, "view:loan");

    const loan = await Loan.findById(params.id);

    return NextResponse.json(
      { msg: "Data Found", payload: loan },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
