import Staff from "@/lib/models/Staff";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Update employee details
export async function PUT(request, { params }) {
  try {
    await verifyToken(request, "update:staff");

    const body = await request.json();

    await Staff.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        phone: body.phone,
        role: body.role,
        salary: body.salary,
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ msg: "সফলভাবে আপডেট হয়েছে।" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
}
