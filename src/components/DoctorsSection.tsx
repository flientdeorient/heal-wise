import { useState } from "react";
import DoctorCard from "./DoctorCard";
import AppointmentModal from "./AppointmentModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: "15 years",
    location: "New York Medical Center",
    availability: "Available" as const,
    nextSlot: "Today 2:30 PM",
    consultationFee: "$150",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    experience: "12 years",
    location: "Downtown Health Clinic",
    availability: "Busy" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "$120",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    experience: "18 years",
    location: "Children's Medical Center",
    availability: "Available" as const,
    nextSlot: "Today 4:00 PM",
    consultationFee: "$100",
    image: "https://images.unsplash.com/photo-1594824047509-b0dc7b1ad0d5?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.7,
    experience: "20 years",
    location: "Brain & Spine Institute",
    availability: "Available" as const,
    nextSlot: "Today 3:15 PM",
    consultationFee: "$200",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
  },
];

const DoctorsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookAppointment = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="doctors" className="py-20 bg-muted/30">
      <div className="medical-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Doctor
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced healthcare professionals who care about your well-being
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No doctors found matching your search criteria.
            </p>
          </div>
        )}

        {/* Appointment Modal */}
        {selectedDoctor && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            doctorName={selectedDoctor.name}
            doctorSpecialty={selectedDoctor.specialty}
          />
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;