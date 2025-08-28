import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Shield,
  LogOut,
  Calendar,
  Stethoscope,
  HeartPulse,
  FileText,
  NotebookPen,
  LoaderCircle,
} from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: 'doctor' | 'patient' | string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in.');
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://localhost:4000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error: any) {
        console.error("Failed to fetch user profile:", error);
        const message =
          error.response?.data?.message || 'Session expired. Please log in again.';
        toast.error(message);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoaderCircle className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="ml-4 text-lg text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-600">Could not load user data.</p>
        <Link
          to="/login"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Stethoscope className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hidden sm:block">
                Welcome, {user.firstName}!
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-sm"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem icon={<User />} label="Full Name" value={`${user.firstName} ${user.lastName}`} />
            <ProfileItem icon={<Mail />} label="Email" value={user.email} />
            <ProfileItem icon={<Shield />} label="Role" value={user.role} />
          </div>
        </div>

        {user.role.toLowerCase() === 'doctor' ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor's Portal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                icon={<Calendar className="w-10 h-10 text-indigo-600 mb-3" />}
                title="View Appointments"
                description="Check your schedule and upcoming patient visits."
              />
              <DashboardCard
                icon={<User className="w-10 h-10 text-indigo-600 mb-3" />}
                title="Patient List"
                description="View and manage your patients."
                onClick={() => navigate('/patients')}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient's Area</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                icon={<Calendar className="w-10 h-10 text-blue-500 mb-3" />}
                title="Book Appointment"
                description="Select a date and time to request an appointment."
                onClick={() => navigate('/book-appointment')}
              />
              <DashboardCard
                icon={<FileText className="w-10 h-10 text-purple-500 mb-3" />}
                title="View Prescriptions"
                description="Review your current and past prescriptions."
                onClick={() => navigate('/prescriptions')}
              />
              <DashboardCard
                icon={<NotebookPen className="w-10 h-10 text-green-500 mb-3" />}
                title="Medical History"
                description="Update your allergies and past conditions."
                onClick={() => navigate('/medical-history')}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 👇 Helper Components

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
      <div className="mr-4 text-indigo-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-700 capitalize">{value}</p>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 bg-indigo-50 rounded-lg hover:shadow-xl transition-shadow text-center ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {icon}
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}
