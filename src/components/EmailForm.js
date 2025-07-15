import { sendEmail } from "@/actions/sendEmail";

export default function EmailForm() {
  return (
    <form action={sendEmail} className="space-y-4 max-w-md">
      <input
        type="email"
        name="to"
        required
        placeholder="To"
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="border p-2 w-full"
      />
      <textarea
        name="body"
        placeholder="Email body"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Send Email
      </button>
    </form>
  );
}
