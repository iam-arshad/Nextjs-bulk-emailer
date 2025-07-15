"use client";

import { addRecruiter } from "@/actions/recruiterList";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function RecruiterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      await addRecruiter(formData);
      router.refresh();
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-3"
    >
      <input
        name="email"
        type="email"
        required
        placeholder="Recruiter Email"
        className="border p-2 w-full"
      />
      <input
        name="name"
        required
        placeholder="Recruiter Name"
        className="border p-2 w-full"
      />
      <input
        name="organization"
        required
        placeholder="Recruiter Organization"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        {isPending ? "Adding..." : "Add Recruiter"}
      </button>
    </form>
  );
}
