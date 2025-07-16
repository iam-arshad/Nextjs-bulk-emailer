import RecruiterForm from "@/components/RecruiterForm";
import RecruiterTable from "@/components/RecruiterTable";
import SendEmailsButton from "@/components/SendEmailsButton";
import ResumeUploader from "@/components/ResumeUploader";
import SenderNameInput from "@/components/SenderNameInput"; // new

// Dashboard page component
export default function Dashboard() {
  return (
    <main className="min-h-screen px-4 py-6 flex flex-col items-center relative">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recruiter Outreach Dashboard
      </h1>

      {/* Logout button in the top-right corner */}
      <a
        href="/auth/logout"
        className="bg-red-600 text-white px-4 py-2 rounded absolute top-4 right-4"
      >
        Logout
      </a>

      {/* Main grid layout for user details and recruiter form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Section for sender details and resume upload */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <SenderNameInput />
          <ResumeUploader />
        </div>

        {/* Section for adding a recruiter */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add Recruiter</h2>
          <RecruiterForm />
        </div>
      </div>

      {/* Section for displaying recruiter table and send emails button */}
      <div className="w-full max-w-5xl mt-8">
        <RecruiterTable />
        <SendEmailsButton />
      </div>
    </main>
  );
}
