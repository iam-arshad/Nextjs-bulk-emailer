"use server";

import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { google } from "googleapis";
import { getRecruiters, getSenderName, clearRecruiters } from "./recruiterList";

export async function sendBulkEmails() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) throw new Error("Not authenticated");

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const recruiters = await getRecruiters();
  const senderName = await getSenderName();

  const emailTemplate = (name, organization) => `
Hi ${name},

I came across ${organization} and was truly impressed by the work you’re doing.

I'm currently seeking new opportunities and would love to explore roles at your organization. Attached is my resume. Please let me know if there's a potential fit!

Best regards,  
${senderName}
`;

  const sendPromises = recruiters.map(({ email, name, organization }) => {
    const body = emailTemplate(name, organization);

    const raw = Buffer.from(`To: ${email}\nSubject: Job Inquiry\n\n${body}`)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
  });

  await Promise.all(sendPromises);

  await clearRecruiters();
}
