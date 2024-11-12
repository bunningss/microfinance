import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const body = await request.json();

    await Staff.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        role: body.role,
        salary: body.salary,
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ msg: "সফলভাবে আপডেট হয়েছে।" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "কিছু একটা সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
