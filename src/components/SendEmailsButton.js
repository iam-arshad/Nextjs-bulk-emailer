"use client";

import { useTransition, useState } from "react";
import { sendBulkEmails } from "@/actions/sendBulkEmails";
import { useRouter } from "next/navigation";

// SendEmailsButton component for triggering bulk email sending
export default function SendEmailsButton() {
  const router = useRouter(); // Router for navigation and refreshing
  const [isPending, startTransition] = useTransition(); // Transition state for async actions
  const [toast, setToast] = useState(null); // State for toast notification

  // Handles the send emails button click
  const handleSend = () => {
    startTransition(async () => {
      await sendBulkEmails(); // Call the server action to send emails
      setToast("✅ Emails sent successfully!"); // Show success toast
      router.refresh(); // Refresh the page

      // Hide the toast after 3 seconds
      setTimeout(() => {
        setToast(null);
      }, 3000);
    });
  };

  // Render the send emails button and notifications
  return (
    <div className="mt-6 flex flex-col items-center">
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-6 py-3 rounded"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Emails"}
      </button>

      {/* Show a message while emails are being sent */}
      {isPending && <p className="text-sm text-gray-500 mt-2">Sending emails…</p>}

      {/* Show a toast notification when emails are sent */}
      {toast && (
        <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
