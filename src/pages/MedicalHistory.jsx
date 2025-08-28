import React from 'react';
import { Link } from 'react-router-dom';

export default function MedicalHistory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Medical History</h1>
      <p>Update and view your medical history here.</p>
      <Link
        to="/dashboard"
        className="mt-6 text-indigo-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
