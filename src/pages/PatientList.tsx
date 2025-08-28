import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, User } from 'lucide-react';

// Mock patient data - in a real app, fetch this from your API
const mockPatients = [
  { id: 'p1', firstName: 'Yasir', lastName: 'Rahaman', email: 'yasir@example.com', lastVisit: '2025-08-15' },
  { id: 'p2', firstName: 'Wasia', lastName: 'Rahaman', email: 'wasia@example.com', lastVisit: '2025-08-20' },
  { id: 'p3', firstName: 'Rasib', lastName: 'Kamal', email: 'rasib@example.com', lastVisit: '2025-07-30' },
  { id: 'p4', firstName: 'Mina', lastName: 'Bibi', email: 'mina@example.com', lastVisit: '2025-09-01' },
  { id: 'p5', firstName: 'Lisan', lastName: 'Sajal', email: 'lisan@example.com', lastVisit: '2025-09-01' },
  { id: 'p6', firstName: 'piyush', lastName: 'Ali', email: 'piyush@example.com', lastVisit: '2025-09-01' },

];

function PatientList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Patient List
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Patient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-indigo-100 rounded-full mr-4">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
                </div>
                <button className="mt-4 w-full text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
                  View Details
                </button>
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">No patients found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
