import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        setUser({
          firstName:"Tanbir",
          lastName: "Ali",
          role:"Doctor"
        })

        // const res = await axios.get("http://localhost:4000/api/auth/me", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // setUser(res.data.user);                 
      } catch (error: any) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.firstName} {user.lastName}!
      </h1>
      <p className="text-gray-700">Role: {user.role}</p>

      {user.role === "doctor" ? (
        <div className="mt-6 bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Doctor Dashboard</h2>
          <p>Here you can manage your patients and appointments.</p>
        </div>
      ) : (
        <div className="mt-6 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Patient Dashboard</h2>
          <p>Here you can view your prescriptions and book appointments.</p>
        </div>
      )}
    </div>
  );
}
