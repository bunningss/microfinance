import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDb();

    const staff = await Staff.findById(params.id).select("role").lean();

    return NextResponse.json(
      { msg: "Role Found.", payload: staff },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
