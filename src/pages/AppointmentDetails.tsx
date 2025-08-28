import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AppointmentDetails = () => {
  const { id } = useParams();

  // In real scenario, fetch data using `id`
  const appointment = {
    id,
    patient: 'John Doe',
    date: '2025-09-10',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: 'Patient is recovering well. Recommend follow-up in 2 weeks.',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <Link to="/appointments" className="text-sm text-blue-600 hover:underline flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Appointments
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Details</h2>
        <p><strong>Patient:</strong> {appointment.patient}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        <p className="mt-4"><strong>Doctor Notes:</strong></p>
        <p className="text-gray-700">{appointment.notes}</p>
      </div>
    </div>
  );
};

export default AppointmentDetails;
