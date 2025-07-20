'use client';
import React, { useState } from 'react';

export default function RecruiterForm({ onAdd }) {
  const [recruiter, setRecruiter] = useState({
    name: '',
    email: '',
    org: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!recruiter.name || !recruiter.email || !recruiter.org) {
      alert('Please enter name, email, and organization.');
      return;
    }

    onAdd(recruiter);
    setRecruiter({ name: '', email: '', org: '' }); // reset after adding
  };

  return (
    <div className="space-y-4 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recruiter Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Jane Doe"
          value={recruiter.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recruiter Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="jane@example.com"
          value={recruiter.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organization
        </label>
        <input
          type="text"
          name="org"
          placeholder="Company Name"
          value={recruiter.org}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
        />
      </div>

      <button
        onClick={handleAdd}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Recruiter
      </button>
    </div>
  );
}
