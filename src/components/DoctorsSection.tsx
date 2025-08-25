import { useState } from "react";
import DoctorCard from "./DoctorCard";
import AppointmentModal from "./AppointmentModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, X } from "lucide-react";

// Mock doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. M Rahaman",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: "15 years",
    location: "Laldighi Medical",
    availability: "Available" as const,
    nextSlot: "Today 2:30 PM",
    consultationFee: "600",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. S Mitro",
    specialty: "Dermatologist",
    rating: 4.8,
    experience: "12 years",
    location: "Downtown Health Clinic",
    availability: "Available" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "500",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name:"Dr. Bholanath Aich",
    specialty:"Pediatrician",
    rating:4.9,
    experience:"18 years",
    location:"Little-Heart Medical Center",
    availability:"Busy" as const,
    nextSlot:"Today 6:00 PM",
    consultationFee:"700",
    image:"https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png",
  },
  {
    id: 4,
    name: "Dr. Hamid Ali",
    specialty: "Neurologist",
    rating: 4.7,
    experience: "20 years",
    location: "Lila Hospital pvt ltd",
    availability: "Available" as const,
    nextSlot: "Today 3:15 PM",
    consultationFee: "450",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
  },
    {
    id: 5,
    name: "Dr.Kalyan Mitra",
    specialty: "Physician",
    rating: 4.8,
    experience: "10 years",
    location: "Dipanita Health Clinic",
    availability: "Available" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoWz6YmE8CdIOfuIRfIwrxgTxeXiM0XvXa7ExBnlhPfyRbjTHWJ58nH4&s",
  },
  {
    id: 6,
    name: "Dr.Rajiv Biswas",
    specialty: "gecologistyn",
    rating: 4.9,
    experience: "10 years",
    location: "Dipanita Health Clinic",
    availability: "Busy" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "700",
    image: "https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png"
  },
   {
    id: 7,
    name: "Dr.Farman Ali",
    specialty: "Physician",
    rating: 4.8,
    experience: "10 years",
    location: "Bonus Homeo Clinic",
    availability: "Available" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "550",
    image: "https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png"
  },
   {
    id: 8,
    name: "Dr.Madhav Mandal",
    specialty: "MD Physician",
    rating: 4.9,
    experience: "10 years",
    location: "Laldighi Health Clinic",
    availability: "Available" as const,
    nextSlot: "Tomorrow 10:00 AM",
    consultationFee: "600",
    image: "https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png"
  },
];

const DoctorsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const specialties = [...new Set(doctors.map(d => d.specialty))];
  const availabilityOptions = ["Available", "Busy"];

  const clearFilters = () => {
    setSelectedSpecialty("");
    setSelectedAvailability("");
    setSearchTerm("");
  };

  const handleBookAppointment = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesAvailability = !selectedAvailability || doctor.availability === selectedAvailability;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const activeFiltersCount = [selectedSpecialty, selectedAvailability].filter(Boolean).length;

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
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Filter Doctors</h3>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialty</label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All specialties</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
                    <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="All doctors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All doctors</SelectItem>
                        {availabilityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option} only
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSpecialty && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedSpecialty("")}>
                  {selectedSpecialty} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {selectedAvailability && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedAvailability("")}>
                  {selectedAvailability} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          )}
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