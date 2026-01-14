import { cookies } from "next/headers";
import Link from "next/link";

// Home page component
export default async function Home() {
  // Retrieve cookies from the request
  const cookieStore = await cookies();
  // Check if the user is logged in by looking for the refresh_token cookie
  const isLoggedIn = cookieStore.get("refresh_token");

  // Render the main content
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Welcome to Gmail Outreach</h1>

      {/* Show login button if not logged in, otherwise show dashboard link */}
      {!isLoggedIn ? (
        <Link
          href="/auth/login"
          className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-6 py-3 rounded transition-colors"
        >
          Login with Google
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className="bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white px-6 py-3 rounded transition-colors"
        >
          Go to Dashboard
        </Link>
      )}

       {/* Footer with author credit */}
      <footer className="text-gray-700 dark:text-gray-300 text-sm absolute bottom-4 right-4">
        Made with ❤️ by Arshad
      </footer>
    </main>
  );
}
