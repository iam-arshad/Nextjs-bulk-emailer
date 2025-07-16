"use server";

// Initialize recruiters and senderName from globalThis or set to default values
let recruiters = globalThis.recruiters || [];
let senderName = globalThis.senderName || "";

// Set the sender's name globally
export async function setSenderName(name) {
  globalThis.senderName = name;
}

// Add a recruiter to the recruiters list and update global state
export async function addRecruiter(formData) {
  const recruiter = {
    email: formData.get("email"),
    name: formData.get("name"),
    organization: formData.get("organization"),
  };

  senderName = formData.get("senderName");
  recruiters.push(recruiter);

  // Update global state
  globalThis.recruiters = recruiters;
  globalThis.senderName = senderName;
}

// Retrieve the current list of recruiters
export async function getRecruiters() {
  return recruiters;
}

// Retrieve the sender's name, with a fallback value if not set
export async function getSenderName() {
  return senderName || globalThis.senderName || "Arshad"; // fallback value;
}

// Clear the recruiters list and update global state
export async function clearRecruiters() {
  recruiters = [];
  globalThis.recruiters = [];
}
