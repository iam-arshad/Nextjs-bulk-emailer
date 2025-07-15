"use server";

import { setResume } from "@/lib/resumeStore";

export async function uploadResume(formData) {
  const file = formData.get("resume");
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  setResume({
    buffer,
    type: file.type,
    filename: file.name,
  });
}
