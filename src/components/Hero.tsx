import { Button } from "@/components/ui/button";
import { Calendar, Clock, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional healthcare consultation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 medical-container text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Health,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Our Priority
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Experience modern healthcare with AI-powered prescriptions, instant doctor consultations, and seamless appointment booking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Calendar className="mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Heart className="mr-2" />
              Find Doctors
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Clock className="w-5 h-5 mr-2" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Shield className="w-5 h-5 mr-2" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Heart className="w-5 h-5 mr-2" />
              <span>AI Prescriptions</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
    </section>
  );
};

export default Hero;