import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DoctorsSection from "@/components/DoctorsSection";
import PrescriptionSection from "@/components/PrescriptionSection";
import ContactModal from "@/components/ContactModal";
import EmergencyContact from "@/components/EmergencyContact";
import { Button } from "@/components/ui/button";
import { Heart, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>
      
      {/* Features Overview */}
      <section className="py-20 bg-muted/20">
        <div className="medical-container text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose HealWise?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Modern healthcare solutions designed to make your health journey simple, secure, and effective.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="medical-card p-8 text-center">
              <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Care</h3>
              <p className="text-muted-foreground">
                Connect with board-certified doctors and specialists from the comfort of your home.
              </p>
            </div>
            
            <div className="medical-card p-8 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Access</h3>
              <p className="text-muted-foreground">
                Book appointments instantly and get consultations within minutes, not days.
              </p>
            </div>
            
            <div className="medical-card p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Powered</h3>
              <p className="text-muted-foreground">
                Get AI-assisted prescriptions and health insights, verified by medical professionals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Doctors Section */}
      <DoctorsSection />
      
      {/* Prescriptions Section */}
      <PrescriptionSection />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="medical-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-bold">HealWise</span>
              </div>
              <p className="text-background/70 mb-4 max-w-md">
                Your trusted healthcare partner, providing modern medical solutions 
                with AI-powered prescriptions and expert doctor consultations.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setIsContactOpen(true)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => setIsEmergencyOpen(true)}
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Emergency
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#home" className="hover:text-white medical-transition">Home</a></li>
                <li><a href="#doctors" className="hover:text-white medical-transition">Find Doctors</a></li>
                <li><a href="#prescriptions" className="hover:text-white medical-transition">AI Prescriptions</a></li>
                <li><a href="#appointments" className="hover:text-white medical-transition">Appointments</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-background/70">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>1-800-HEALWISE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@healwise.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Available Nationwide</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 HealWise. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
      
      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <EmergencyContact isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;