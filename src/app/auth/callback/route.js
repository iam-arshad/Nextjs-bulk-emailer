import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// API route handler for OAuth2 callback
export async function GET(request) {
  // Parse the URL and extract the authorization code from query params
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // Get a new OAuth2 client instance
  const oauth2Client = getOAuthClient();
  // Exchange the authorization code for tokens
  const { tokens } = await oauth2Client.getToken(code);

  // Store the refresh token in cookies (consider using a more secure storage in production)
  if (tokens.refresh_token) {
    const cookieStore = await cookies();
    cookieStore.set("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
    });
  }

  // Redirect the user to the dashboard after successful authentication
  redirect("/dashboard");
}
