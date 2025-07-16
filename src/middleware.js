import { NextResponse } from "next/server";

// Middleware function to handle authentication for dashboard routes
export function middleware(req) {
  // Retrieve the refresh token from cookies
  const refreshToken = req.cookies.get("refresh_token");

  // If no refresh token and trying to access /dashboard, redirect to home page
  if (!refreshToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed if authenticated or not accessing /dashboard
  return NextResponse.next();
}
