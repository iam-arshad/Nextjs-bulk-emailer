import { cookies } from "next/headers";
import RecruiterForm from "@/components/RecruiterForm";
import RecruiterTable from "@/components/RecruiterTable";
import SendEmailsButton from "@/components/SendEmailsButton";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("refresh_token");

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">You must be logged in to view this page.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Recruiter Outreach Dashboard</h1>

      <a
        href="/auth/logout"
        className="bg-red-600 text-white px-4 py-2 rounded absolute top-4 right-4"
      >
        Logout
      </a>

      <RecruiterForm />
      <RecruiterTable />
      <SendEmailsButton />
    </main>
  );
}
