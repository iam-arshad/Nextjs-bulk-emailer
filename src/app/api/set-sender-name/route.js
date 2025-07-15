import { NextResponse } from "next/server";
import { setSenderName } from "@/actions/recruiterList";

export async function POST(req) {
  const { name } = await req.json();
  await setSenderName(name);
  return NextResponse.json({ ok: true });
}
