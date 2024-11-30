import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ msg: "Hello" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
