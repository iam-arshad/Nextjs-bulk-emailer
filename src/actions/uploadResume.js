"use server";

// Import the setResume function from the resume store
import { setResume } from "@/lib/resumeStore";

// Handles the upload of a resume file from form data
export async function uploadResume(formData) {
  // Retrieve the file object from the form data
  const file = formData.get("resume");
  if (!file) return; // Exit if no file is provided

  // Convert the file to a Node.js Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Store the resume buffer, type, and filename using setResume
  setResume({
    buffer,
    type: file.type,
    filename: file.name,
  });
}
