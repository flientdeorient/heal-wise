import React from 'react';
import { Link } from 'react-router-dom';

export default function BookAppointment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Book Appointment</h1>
      <p>This is where patients can book appointments.</p>
      <Link
        to="/dashboard"
        className="mt-6 text-indigo-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
