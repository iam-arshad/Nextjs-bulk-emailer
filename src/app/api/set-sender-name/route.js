import { NextResponse } from "next/server";
import { setSenderName } from "@/actions/recruiterList";

// API route handler for POST requests to set the sender's name
export async function POST(req) {
  // Parse the request body to get the name
  const { name } = await req.json();
  // Call the server action to set the sender's name
  await setSenderName(name);
  // Return a JSON response indicating success
  return NextResponse.json({ ok: true });
}
