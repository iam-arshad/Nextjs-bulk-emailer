let resumeBuffer = null;
let resumeMimeType = null;
let resumeFilename = null;

export function setResume({ buffer, type, filename }) {
  resumeBuffer = buffer;
  resumeMimeType = type;
  resumeFilename = filename;
}

export function getResume() {
  return {
    resumeBuffer,
    resumeMimeType,
    resumeFilename,
  };
}
