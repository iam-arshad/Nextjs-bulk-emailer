"use client";

import { uploadResume } from "@/actions/uploadResume";
import { useState } from "react";

// ResumeUploader component for uploading a resume file
export default function ResumeUploader() {
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to store the upload status message
  const [status, setStatus] = useState("");

  // Handles file selection and upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Prepare form data with the selected file
    const formData = new FormData();
    formData.append("resume", file);

    setStatus("Uploading...");
    await uploadResume(formData); // Upload the resume using server action
    setStatus("✅ Resume uploaded!");
  };

  // Render the file input and status message
  return (
    <div className="mt-4 w-full max-w-md">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
        className="block w-full"
      />
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}
