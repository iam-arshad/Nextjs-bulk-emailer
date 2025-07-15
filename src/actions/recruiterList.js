"use server";

let recruiters = globalThis.recruiters || [];
let senderName = globalThis.senderName || "";

export async function addRecruiter(formData) {
  const recruiter = {
    email: formData.get("email"),
    name: formData.get("name"),
    organization: formData.get("organization"),
  };

  senderName = formData.get("senderName");
  recruiters.push(recruiter);

  globalThis.recruiters = recruiters;
  globalThis.senderName = senderName;
}

export async function getRecruiters() {
  return recruiters;
}

export async function getSenderName() {
  return senderName;
}

export async function clearRecruiters() {
  recruiters = [];
  globalThis.recruiters = [];
}
