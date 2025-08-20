import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  AlertCircle,
  Heart,
  Ambulance,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyContact = ({ isOpen, onClose }: EmergencyContactProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const emergencyServices = [
    {
      name: "Emergency Medical Services",
      number: "911",
      description: "Life-threatening emergencies",
      icon: Ambulance,
      color: "bg-red-500"
    },
    {
      name: "HealWise Emergency Line",
      number: "1-800-HEAL-911",
      description: "Medical emergencies & urgent care",
      icon: Heart,
      color: "bg-primary"
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      description: "Poisoning emergencies",
      icon: Shield,
      color: "bg-orange-500"
    }
  ];

  const nearbyHospitals = [
    {
      name: "City General Hospital",
      distance: "2.1 miles",
      waitTime: "15 min",
      emergency: true
    },
    {
      name: "St. Mary's Medical Center",
      distance: "3.4 miles",
      waitTime: "8 min",
      emergency: true
    },
    {
      name: "Regional Urgent Care",
      distance: "1.8 miles",
      waitTime: "5 min",
      emergency: false
    }
  ];

  const handleEmergencyCall = async (number: string, serviceName: string) => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: `Connecting to ${serviceName}`,
      description: `Dialing ${number}...`,
    });
    
    // In a real app, this would initiate the call
    window.open(`tel:${number}`);
    
    setIsConnecting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-red-600 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            Emergency Contacts
          </DialogTitle>
          <DialogDescription>
            Quick access to emergency services and nearby medical facilities
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Emergency Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Medical Emergency?</h3>
            </div>
            <p className="text-sm text-red-700 mb-3">
              If you're experiencing a life-threatening emergency, call 911 immediately.
            </p>
            <Button 
              variant="destructive" 
              size="lg" 
              className="w-full"
              onClick={() => handleEmergencyCall("911", "Emergency Services")}
              disabled={isConnecting}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Call 911 Now"}
            </Button>
          </div>

          {/* Emergency Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Services</h3>
            <div className="grid gap-3">
              {emergencyServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="medical-card hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="font-mono">
                            {service.number}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEmergencyCall(service.number, service.name)}
                            disabled={isConnecting}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Nearby Hospitals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nearby Medical Facilities</h3>
            <div className="grid gap-3">
              {nearbyHospitals.map((hospital, index) => (
                <Card key={index} className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{hospital.name}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{hospital.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">~{hospital.waitTime} wait</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {hospital.emergency && (
                          <Badge variant="secondary" className="text-xs">
                            Emergency
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat Support
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2" />
              Medical History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyContact;