import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const oauth2Client = getOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);

  // As of now, storing the refresh token in cookies. Later, consider using a more secure storage(db) solution.
  if (tokens.refresh_token) {
    const cookieStore = await cookies();
    cookieStore.set("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
    });
  }

  redirect("/dashboard");
}
