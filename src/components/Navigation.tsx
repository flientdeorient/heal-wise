import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Calendar, FileText, Users, Settings } from "lucide-react";
import PatientDashboard from "./PatientDashboard";
import ContactModal from "./ContactModal";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "#home", icon: Heart },
    { name: "Doctors", href: "#doctors", icon: Users },
    // { name: "Appointments", href: "#appointments", icon: Calendar },
    { name: "Prescriptions", href: "#prescriptions", icon: FileText },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border">
      <div className="medical-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">HealWise</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-foreground hover:text-primary medical-transition"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setIsDashboardOpen(true)}>Dashboard</Button>
            <Button variant="medical" onClick={() => setIsContactOpen(true)}>Contact Us</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/signup')}>Sign up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-primary medical-transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" onClick={() => { setIsDashboardOpen(true); setIsMenuOpen(false); }}>Dashboard</Button>
                <Button variant="medical" onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <PatientDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </nav>
  );
};

export default Navigation;