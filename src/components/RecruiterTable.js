import { getRecruiters } from "@/actions/recruiterList";

// Async component to display the list of recruiters in a table
export default async function RecruiterTable() {
  // Fetch the list of recruiters from the server action
  const recruiters = await getRecruiters();

  // Show a message if there are no recruiters
  if (!recruiters.length) return <p className="text-gray-500">No recruiters added yet.</p>;

  // Render the recruiters table
  return (
    <table className="table-auto border mt-4 w-full max-w-2xl mx-auto text-left">
      <thead>
        <tr>
          <th className="border p-2">Email</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Organization</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through recruiters and render each as a table row */}
        {recruiters.map((r, i) => (
          <tr key={i}>
            <td className="border p-2">{r.email}</td>
            <td className="border p-2">{r.name}</td>
            <td className="border p-2">{r.organization}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
