import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages & Components
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import WritePrescription from "./pages/WritePrescription";
import Appointments from "./pages/Appointments";

// New Patient Pages
import BookAppointment from "./pages/BookAppointment";
import Prescriptions from "./pages/Prescriptions";
import MedicalHistory from "./pages/MedicalHistory";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["doctor", "patient"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute allowedRoles={["doctor"]}>
                <PatientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/write-prescription"
            element={
              <PrivateRoute allowedRoles={["doctor"]}>
                <WritePrescription />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute allowedRoles={["doctor", "patient"]}>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/book-appointment"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Prescriptions />
              </PrivateRoute>
            }
          />
          <Route
            path="/medical-history"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <MedicalHistory />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
