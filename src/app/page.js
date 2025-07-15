export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Gmail Sender</h1>
      <a
        href="/auth/login"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Login with Google
      </a>
    </div>
  );
}
