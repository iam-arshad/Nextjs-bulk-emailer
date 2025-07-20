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

  const emailTemplate = (recruiterName, org, sender) => `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; text-align: justify; line-height: 1.6;">
    <p>Dear ${recruiterName},</p>

    <p>I hope this message finds you well. I came across an opportunity at <strong>${org}</strong> for a <strong>React Developer</strong> role, and I’m writing to express my interest in being considered for this position. With 4 years of experience in frontend development, I have worked extensively with modern JavaScript frameworks and development practices.</p>

    <p><strong>Key Skills & Experience:</strong></p>
    <ul>
      <li>✔ ReactJS – Built performant and responsive web applications</li>
      <li>✔ Redux & TypeScript – Managed scalable, maintainable application states</li>
      <li>✔ RESTful APIs – Integrated and consumed backend services efficiently</li>
      <li>✔ Testing – Proficient in Jest and Enzyme for robust test coverage</li>
      <li>✔ DevOps – Hands-on experience with GitLab CI/CD and deployment workflows</li>
    </ul>

    <p>I’m particularly drawn to this opportunity due to my passion for building intuitive UIs and my collaborative experience across globally distributed teams.</p>

    <p>Please find my resume attached for your review. I would appreciate the opportunity to connect and discuss how I could contribute to your team’s goals.</p>

    <p>Best regards,<br>${sender}</p>
  </div>
`;

  const sendPromises = recruiters.map(async ({ email, name: recruiterName, org: organization }) => {
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
      emailTemplate(recruiterName, organization, senderName),
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
