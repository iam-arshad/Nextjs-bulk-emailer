"use server";

import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { google } from "googleapis";

export async function sendEmail(formData) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    throw new Error("User not authenticated");
  }

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const email = [
    `To: ${formData.get("to")}`,
    `Subject: ${formData.get("subject")}`,
    "",
    formData.get("body"),
  ].join("\n");

  const encoded = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encoded,
    },
  });
}
