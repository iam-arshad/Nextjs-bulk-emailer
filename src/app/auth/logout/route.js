import { NextResponse } from "next/server";

// API route handler for logging out the user
export async function GET() {
  // Redirect the user to the home page after logout
  const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  // Clear the refresh_token cookie by setting it to an empty value and expiring it immediately
  response.cookies.set("refresh_token", "", {
    maxAge: 0,
    path: "/",
  });
  // Return the response with the cleared cookie and the redirect
  return response;
}
