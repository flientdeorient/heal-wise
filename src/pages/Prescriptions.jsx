import React from 'react';
import { Link } from 'react-router-dom';

export default function Prescriptions() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Prescriptions</h1>
      <p>Here you can view your prescriptions.</p>
      <Link
        to="/dashboard"
        className="mt-6 text-indigo-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
