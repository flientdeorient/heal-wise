import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function WritePrescription() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log it or show a toast
    console.log("Prescription submitted");
    alert("Prescription submitted successfully!");
  };

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Write a New Prescription</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Medication</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage & Instructions</label>
              <textarea
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-24"
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Submit Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Optional placeholder for dashboard route (if needed during testing)
function DashboardPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Dashboard Placeholder</h1>
    </div>
  );
}

// Export the prescription component for routing
export default WritePrescription;
