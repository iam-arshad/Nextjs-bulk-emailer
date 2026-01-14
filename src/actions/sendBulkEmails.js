"use server";

import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { google } from "googleapis";

export async function sendBulkEmails({
  senderName,
  resume, // { resumeBase64, resumeMimeType, resumeFilename }
  recruiters,
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) throw new Error("Not authenticated");

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const { resumeBase64, resumeMimeType, resumeFilename } = resume;

  if (!resumeBase64) throw new Error("Resume not uploaded");

  const emailTemplate = (recruiterName, org, sender, platform) => `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; text-align: justify; line-height: 1.6;">
  <p>Dear ${recruiterName},</p>

  <p>
    I hope you are doing well. I came across an open position at 
    <strong>${org}</strong> through <strong>${platform}</strong> and wanted to reach out to express my interest.
  </p>

  <p>
    I am currently exploring new opportunities and believe my background and interests align well
    with the kind of work your team is doing. I enjoy working on building clean, user-friendly
    interfaces and collaborating with teams to deliver reliable solutions.
  </p>

  <p>
    I have attached my resume for your reference. I would appreciate the opportunity to connect and
    learn more about the role and how I could potentially contribute to your team.
  </p>

  <p>
    Thank you for your time and consideration.
  </p>

  <p>
    Best regards,<br />
    ${sender}
  </p>
</div>
`;

  const sendPromises = recruiters.map(async ({ email, name: recruiterName, org: organization, platform }) => {
    const boundary = "boundary123";

    const messageParts = [
      `To: ${email}`,
      "Subject: Application for React Developer Position",
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "",
      emailTemplate(recruiterName, organization, senderName, platform),
      "",
      `--${boundary}`,
      `Content-Type: ${resumeMimeType}`,
      `Content-Disposition: attachment; filename="${resumeFilename}"`,
      "Content-Transfer-Encoding: base64",
      "",
      resumeBase64, // Already base64-encoded on client
      `--${boundary}--`,
    ];

    const rawMessage = messageParts.join("\r\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  });

  await Promise.all(sendPromises);
}
