// Variables to store the resume buffer, MIME type, and filename in memory
let resumeBuffer = null;
let resumeMimeType = null;
let resumeFilename = null;

// Function to set the resume buffer, MIME type, and filename
export function setResume({ buffer, type, filename }) {
  resumeBuffer = buffer;
  resumeMimeType = type;
  resumeFilename = filename;
}

// Function to retrieve the stored resume buffer, MIME type, and filename
export function getResume() {
  return {
    resumeBuffer,
    resumeMimeType,
    resumeFilename,
  };
}
