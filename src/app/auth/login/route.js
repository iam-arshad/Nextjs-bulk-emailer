import { getAuthUrl } from "@/lib/google";
import { NextResponse } from "next/server";

// API route handler for initiating Google OAuth2 login
export async function GET() {
  // Generate the Google OAuth2 authentication URL
  const url = getAuthUrl();
  // Redirect the user to the Google OAuth2 login page
  return NextResponse.redirect(url);
}
