import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Heart, 
  Activity,
  Pill,
  Phone,
  Video,
  MessageCircle
} from "lucide-react";

interface PatientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientDashboard = ({ isOpen, onClose }: PatientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("appointments");

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Video Call",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "In-Person",
      status: "pending"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      prescriber: "Dr. Sarah Johnson",
      date: "2024-01-15",
      instructions: "Take once daily with water",
      refillsLeft: 2
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      prescriber: "Dr. Michael Chen",
      date: "2024-01-10",
      instructions: "Take twice daily with meals",
      refillsLeft: 1
    }
  ];

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "normal", icon: Heart },
    { label: "Heart Rate", value: "72 bpm", status: "normal", icon: Activity },
    { label: "BMI", value: "23.5", status: "normal", icon: User },
    { label: "Last Checkup", value: "2 weeks ago", status: "recent", icon: Clock }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Patient Dashboard</DialogTitle>
          <DialogDescription>
            Manage your appointments, prescriptions, and health information
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="space-y-4">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {appointment.type === "Video Call" ? (
                            <Video className="w-6 h-6 text-primary" />
                          ) : (
                            <User className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.date} at {appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                        <div className="mt-2 space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="medical">
                            Join Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Active Prescriptions</h3>
              {recentPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{prescription.medication}</h4>
                          <p className="text-sm text-muted-foreground">Prescribed by {prescription.prescriber}</p>
                          <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {prescription.refillsLeft} refills left
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            Request Refill
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h3 className="text-lg font-semibold col-span-full">Health Overview</h3>
              {healthMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="medical-card">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{metric.label}</h4>
                          <p className="text-lg font-semibold text-primary">{metric.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4">
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
              <p className="text-muted-foreground mb-4">
                Access your complete medical history, test results, and doctor notes
              </p>
              <Button variant="medical">
                Connect Supabase for Medical Records
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDashboard;