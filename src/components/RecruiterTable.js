'use client';

export default function RecruiterTable({ recruiters, setRecruiters }) {
  if (!recruiters.length) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No recruiters added yet.
      </p>
    );
  }

  const handleRemove = (indexToRemove) => {
    setRecruiters((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full max-w-4xl mx-auto text-sm text-left text-gray-700 bg-white border border-gray-200 shadow-md rounded-md">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 border-b border-gray-200">Email</th>
            <th className="px-4 py-3 border-b border-gray-200">Name</th>
            <th className="px-4 py-3 border-b border-gray-200">Organization</th>
            <th className="px-4 py-3 border-b border-gray-200 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2 border-t border-gray-200">{r.email}</td>
              <td className="px-4 py-2 border-t border-gray-200">{r.name}</td>
              <td className="px-4 py-2 border-t border-gray-200">{r.org}</td>
              <td className="px-4 py-2 border-t border-gray-200 text-center">
                <button
                  onClick={() => handleRemove(i)}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Remove"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
