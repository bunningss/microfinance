import { connectDb } from "@/lib/db/connectDb";
import User from "@/lib/models/User";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await User.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const staffs = await User.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { msg: "Data found.", payload: staffs },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
