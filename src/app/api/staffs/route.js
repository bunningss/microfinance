import bcrypt from "bcrypt";
import Staff from "@/lib/models/Staff";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Get all staffs
export async function GET(request) {
  try {
    await verifyToken(request, "view:staffs");

    const staffs = await Staff.find()
      .sort({ createdAt: -1 })
      .select("-password");

    return NextResponse.json(
      { msg: "Data found.", payload: staffs },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}

// Add a staff
export async function POST(request) {
  try {
    const { id } = await verifyToken(request, "add:staffs"); // Add addedBy in the future

    const { name, email, phone, password, confirmPassword, role, salary } =
      await request.json();

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff)
      return NextResponse.json(
        { msg: "এই ইমেলের সাথে যুক্ত একটি অ্যাকাউন্ট আছে।" },
        { status: 400 }
      );

    if (password !== confirmPassword)
      return NextResponse.json(
        { msg: "উভয় পাসওয়ার্ড মেলে না।" },
        { status: 400 }
      );

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Staff({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      salary,
      siteId: process.env.SITE_ID,
    });
    await newUser.save();

    return NextResponse.json(
      { msg: "স্টাফ সফলভাবে যোগ করা হয়েছে." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
