"use client";

import { useTransition, useState } from "react";
import { sendBulkEmails } from "@/actions/sendBulkEmails";
import { useRouter } from "next/navigation";

export default function SendEmailsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState(null);

  const handleSend = () => {
    startTransition(async () => {
      await sendBulkEmails();
      setToast("✅ Emails sent successfully!");
      router.refresh();

      setTimeout(() => {
        setToast(null);
      }, 3000);
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-6 py-3 rounded"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Emails"}
      </button>

      {isPending && <p className="text-sm text-gray-500 mt-2">Sending emails…</p>}

      {toast && (
        <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
