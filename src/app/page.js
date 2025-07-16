import { cookies } from "next/headers";

// Home page component
export default async function Home() {
  // Retrieve cookies from the request
  const cookieStore = await cookies();
  // Check if the user is logged in by looking for the refresh_token cookie
  const isLoggedIn = cookieStore.get("refresh_token");

  // Render the main content
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Gmail Outreach</h1>

      {/* Show login button if not logged in, otherwise show dashboard link */}
      {!isLoggedIn ? (
        <a
          href="/auth/login"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Login with Google
        </a>
      ) : (
        <a
          href="/dashboard"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Go to Dashboard
        </a>
      )}
    </main>
  );
}
