import { NextResponse } from "next/server";

export function middleware(req) {
  const refreshToken = req.cookies.get("refresh_token");

  if (!refreshToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
