import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Calendar } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  availability: "Available" | "Busy" | "Offline";
  nextSlot: string;
  consultationFee: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: number) => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-accent text-accent-foreground";
      case "Busy":
        return "bg-yellow-500 text-white";
      case "Offline":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="medical-card p-6 hover:scale-105 medical-transition group">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            doctor.availability === "Available" ? "bg-accent" : 
            doctor.availability === "Busy" ? "bg-yellow-500" : "bg-gray-500"
          }`}></div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
          <p className="text-muted-foreground">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="text-sm text-muted-foreground">({doctor.experience})</span>
          </div>
        </div>
        
        <Badge className={getAvailabilityColor(doctor.availability)}>
          {doctor.availability}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Next available: {doctor.nextSlot}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Consultation Fee</span>
          <span className="font-semibold text-primary">{doctor.consultationFee}</span>
        </div>
      </div>
      
      <Button 
        variant="medical" 
        className="w-full group-hover:shadow-lg"
        onClick={() => onBookAppointment(doctor.id)}
        disabled={doctor.availability === "Offline"}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Book Appointment
      </Button>
    </div>
  );
};

export default DoctorCard;