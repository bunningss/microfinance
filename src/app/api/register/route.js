import User from "@/lib/models/User";
import bcrypt from "bcrypt";
import { connectDb } from "@/lib/db/connectDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDb();

    let body = await request.json();

    if (body.password.trim().length < 8)
      return NextResponse.json(
        { msg: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।" },
        { status: 400 }
      );

    if (body.password !== body.confirmPassword)
      return NextResponse.json(
        { msg: "উভয় পাসওয়ার্ড মেলে না।" },
        { status: 400 }
      );

    const emailExist = await User.findOne({ email: body.email });
    if (emailExist) {
      return NextResponse.json(
        {
          msg: "এই ইমেলের সাথে যুক্ত একটি অ্যাকাউন্ট আছে। লগ ইন করার চেষ্টা করুন।",
        },
        { status: 400 }
      );
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Creating new user
    const newUser = new User({
      name: body.name,
      siteId: process.env.SITE_ID,
      email: body.email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { msg: "অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে।" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
