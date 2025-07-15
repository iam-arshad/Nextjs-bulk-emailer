import { getRecruiters } from "@/actions/recruiterList";

export default async function RecruiterTable() {
  const recruiters = await getRecruiters();

  if (!recruiters.length) return <p className="text-gray-500">No recruiters added yet.</p>;

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
