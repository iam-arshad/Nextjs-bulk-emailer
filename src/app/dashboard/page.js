import RecruiterForm from "@/components/RecruiterForm";
import RecruiterTable from "@/components/RecruiterTable";
import SendEmailsButton from "@/components/SendEmailsButton";

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Recruiter Outreach Dashboard</h1>

      <RecruiterForm />
      <RecruiterTable />
      <SendEmailsButton />
    </main>
  );
}
