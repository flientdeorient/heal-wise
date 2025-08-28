import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// This is the main component for the Appointments page.
// It is no longer the default export.
function Appointments() {
  // Mock data for now
  const upcomingAppointments = [
    { id: 1, patient: 'Ahmed Nayeem', time: '10:00 AM', date: '2025-09-10', status: 'Confirmed' },
    { id: 2, patient: 'Irfan Habib', time: '11:30 AM', date: '2025-09-10', status: 'Pending' },
     { id: 3, patient: 'Md Arif', time: '11:30 AM', date: '2025-09-10', status: 'Pending' },
    { id: 4, patient: 'MD Paglu', time: '11:30 AM', date: '2025-09-10', status: 'Pending' },
  

];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Appointments</h1>
          {/* We will add a calendar or list view here later */}
          <div className="space-y-4">
            {upcomingAppointments.map(app => (
              <div key={app.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{app.patient}</p>
                  <p className="text-sm text-gray-600">{app.date} at {app.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                   <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {app.status}
                   </span>
                   <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appointments;




