"use client";

import { uploadResume } from "@/actions/uploadResume";
import { useState } from "react";

export default function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("resume", file);

    setStatus("Uploading...");
    await uploadResume(formData);
    setStatus("✅ Resume uploaded!");
  };

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
