import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("refresh_token");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Gmail Outreach</h1>

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
