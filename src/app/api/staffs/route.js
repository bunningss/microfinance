import bcrypt from "bcrypt";
import Staff from "@/lib/models/Staff";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Get all staffs
export async function GET(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id);
    if (
      user.role !== "admin" &&
      user.role !== "marketing officer" &&
      user.role !== "staff"
    )
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

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
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();
    const user = await Staff.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const { name, email, password, confirmPassword, role, salary } =
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
