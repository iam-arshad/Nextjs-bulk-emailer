'use client';

import { useTransition } from 'react';
import { sendBulkEmails } from '@/actions/sendBulkEmails';

export default function SendEmailsButton({ senderDetails, recruiters, deleteAllRecruiters }) {
  const [isPending, startTransition] = useTransition();

  const handleSend = () => {
    if (!senderDetails.name || !senderDetails.resume) {
      console.log(senderDetails,recruiters);
      alert('Please provide both sender name and resume.');
      return;
    }
    if (!recruiters.length) {
      alert('Please add at least one recruiter.');
      return;
    }

    startTransition(async () => {
      try {
        await sendBulkEmails({
          senderName: senderDetails.name,
          resume: senderDetails.resume,
          recruiters,
        });
        alert('Emails sent successfully!');
        deleteAllRecruiters(); // Clear recruiters after sending
      } catch (err) {
        console.error('Error sending emails:', err);
        alert('Something went wrong while sending emails.');
      }
    });
  };

  return (
    <button
      onClick={handleSend}
      disabled={isPending}
      className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? 'Sending...' : 'Send Emails'}
    </button>
  );
}
