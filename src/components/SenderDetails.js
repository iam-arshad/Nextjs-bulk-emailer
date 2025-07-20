'use client';
import React from 'react';

// SenderDetails component for entering sender's name and uploading resume
export default function SenderDetails({ sender, onChange }) {
  // Handle changes to the sender's name input
  const handleNameChange = (e) => {
    onChange('name', e.target.value);
  };

  // Handle resume file upload and convert to base64
  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Convert ArrayBuffer to base64 string
    const resumeBase64 = Buffer.from(arrayBuffer).toString('base64');
    const resumeMimeType = file.type;
    const resumeFilename = file.name;

    // Create resume object with base64, MIME type, and filename
    const resumeObject = {
      resumeBase64,
      resumeMimeType,
      resumeFilename,
    };

    // Update parent state with resume object
    onChange('resume', resumeObject);
  };

  // Render sender name input and resume upload field
  return (
    <div className="space-y-4">
      <div>
        {/* Input for sender's name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={sender.name}
          onChange={handleNameChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
        />
      </div>

      <div>
        {/* Input for uploading resume file */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Resume (.pdf)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeChange}
          className="w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>

      {/* Show selected resume filename if uploaded */}
      {sender.resume && (
        <p className="text-sm text-green-600">
          Selected: <span className="font-medium">{sender.resume.resumeFilename}</span>
        </p>
      )}
    </div>
  );
}
