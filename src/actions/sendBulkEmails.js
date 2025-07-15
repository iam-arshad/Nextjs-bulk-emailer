"use server";

import { getOAuthClient } from "@/lib/google";
import { cookies } from "next/headers";
import { google } from "googleapis";
import { getRecruiters, getSenderName, clearRecruiters } from "./recruiterList";
import { getResume } from "@/lib/resumeStore";

export async function sendBulkEmails() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) throw new Error("Not authenticated");

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const recruiters = await getRecruiters();
  const senderName = await getSenderName();
  const { resumeBuffer, resumeMimeType, resumeFilename } = getResume();

  if (!resumeBuffer) throw new Error("Resume not uploaded");

  const emailTemplate = (name, org) => `
Dear ${name},

I hope you’re doing well. I have seen an opening in the careers page of ${org} and I am excited to apply for the React Developer position at ${org}. With 4 years of experience in frontend and mobile application development, I have worked extensively with ReactJS, NextJS, Redux, RESTful APIs, and CI/CD pipelines.

Key Skills & Experience:
✔ ReactJS – Developed cross-platform mobile apps with smooth UI/UX
✔ TypeScript & Redux – Ensured scalable state management
✔ API Integration – Expertise in RESTful APIs
✔ Testing & Deployment – Experience with Jest, Enzyme
✔ CI/CD & Git – Hands-on experience with Gitlab CI/CD

I am particularly interested in this role due to my strong problem-solving skills and experience working in global teams.

Please find my resume attached for your review. I look forward to the opportunity to discuss how I can contribute to your team.

Best regards,  
${senderName}
`;

  const sendPromises = recruiters.map(async ({ email, name, organization }) => {
    const boundary = "boundary123";
    const messageParts = [
      `To: ${email}`,
      "Subject: Application for React Developer Position",
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "",
      emailTemplate(name, organization),
      "",
      `--${boundary}`,
      `Content-Type: ${resumeMimeType}`,
      `Content-Disposition: attachment; filename="${resumeFilename}"`,
      "Content-Transfer-Encoding: base64",
      "",
      resumeBuffer.toString("base64"),
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
  await clearRecruiters();
}
