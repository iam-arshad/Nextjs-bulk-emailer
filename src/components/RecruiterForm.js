"use client";

// Import necessary hooks and actions
import { addRecruiter } from "@/actions/recruiterList";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

// RecruiterForm component for adding a recruiter
export default function RecruiterForm() {
  const router = useRouter(); // Router for navigation and refreshing
  const [isPending, startTransition] = useTransition(); // Transition state for async actions

  // Handles form submission and adds a recruiter
  const handleSubmit = (formData) => {
    startTransition(async () => {
      await addRecruiter(formData); // Add recruiter using server action
      router.refresh(); // Refresh the page to update recruiter list
    });
  };

  // Render the recruiter form
  return (
    <form
      action={handleSubmit}
      className="space-y-3"
    >
      {/* Input for recruiter email */}
      <input
        name="email"
        type="email"
        required
        placeholder="Recruiter Email"
        className="border p-2 w-full"
      />
      {/* Input for recruiter name */}
      <input
        name="name"
        required
        placeholder="Recruiter Name"
        className="border p-2 w-full"
      />
      {/* Input for recruiter organization */}
      <input
        name="organization"
        required
        placeholder="Recruiter Organization"
        className="border p-2 w-full"
      />

      {/* Submit button, disabled while pending */}
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
