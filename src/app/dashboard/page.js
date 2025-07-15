import EmailForm from "@/components/EmailForm";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Send an Email</h2>
      <EmailForm />
    </div>
  );
}
