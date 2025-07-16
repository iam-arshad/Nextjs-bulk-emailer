"use server"; // Marks this file as a server action for Next.js

import { getOAuthClient } from "@/lib/google"; // Imports function to get Google OAuth client
import { cookies } from "next/headers"; // Imports cookies API for authentication
import { google } from "googleapis"; // Imports Google APIs client library
import { getRecruiters, getSenderName, clearRecruiters } from "./recruiterList"; // Imports recruiter-related utilities
import { getResume } from "@/lib/resumeStore"; // Imports resume retrieval utility

// Main function to send bulk emails with resume attachment to recruiters
export async function sendBulkEmails() {
  // Get cookies and retrieve refresh token for authentication
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) throw new Error("Not authenticated");

  // Initialize OAuth2 client and set credentials
  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  // Create Gmail API client
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // Fetch recruiters list and sender name
  const recruiters = await getRecruiters();
  const senderName = await getSenderName();
  // Retrieve resume details (buffer, MIME type, filename)
  const { resumeBuffer, resumeMimeType, resumeFilename } = getResume();

  // Throw error if resume is not uploaded
  if (!resumeBuffer) throw new Error("Resume not uploaded");

  // Email template generator function
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

  // Map over recruiters and send email to each
  const sendPromises = recruiters.map(async ({ email, name, organization }) => {
    // Define MIME boundary for multipart email
    const boundary = "boundary123";
    // Construct email message parts including text and resume attachment
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

    // Join message parts into a single raw message string
    const rawMessage = messageParts.join("\r\n");

    // Encode the raw message to base64url format required by Gmail API
    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email using Gmail API
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  });

  // Wait for all emails to be sent
  await Promise.all(sendPromises);
  // Clear recruiters list after sending emails
  await clearRecruiters();
}
