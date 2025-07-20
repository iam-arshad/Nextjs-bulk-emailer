'use client';
import React, { useState } from 'react';
import SenderDetails from '@/components/SenderDetails';
import RecruiterForm from '@/components/RecruiterForm';
import RecruiterTable from '@/components/RecruiterTable';
import SendEmailsButton from '@/components/SendEmailsButton';

export default function Dashboard() {
  const [sender, setSender] = useState({
    name: '',
    resume: null,
  });

  const [recruiters, setRecruiters] = useState([]);

  const handleSenderChange = (field, value) => {
    setSender(prev => ({ ...prev, [field]: value }));
  };

  const handleAddRecruiter = (newRecruiter) => {
    setRecruiters([...recruiters, newRecruiter]);
  };

  const handleLogout = () => {
    window.location.href = '/auth/logout';
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 relative">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
      >
        Logout
      </button>

      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Email Dashboard
        </h1>

        {/* Side-by-side section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Sender Details</h2>
            <SenderDetails sender={sender} onChange={handleSenderChange} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Recruiter</h2>
            <RecruiterForm onAdd={handleAddRecruiter} />
          </div>
        </div>

        {/* Recruiter table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recruiter List</h2>
          <RecruiterTable recruiters={recruiters} setRecruiters={setRecruiters}/>
        </div>

        {/* Send emails button */}
        <div className="flex justify-center">
          <SendEmailsButton senderDetails={sender} recruiters={recruiters} deleteAllRecruiters={()=>setRecruiters([])}/>
        </div>
      </div>
    </div>
  );
}
