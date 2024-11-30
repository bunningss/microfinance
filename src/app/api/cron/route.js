import { NextResponse } from "next/server";

export async function GET() {
  console.log("Im from cron job.");
  return NextResponse.json({ ok: true });
}
