import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Stethoscope, FileText, Zap, Shield, Clock } from "lucide-react";

const PrescriptionSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your symptoms and medical history for accurate prescriptions"
    },
    {
      icon: Stethoscope,
      title: "Doctor Verification",
      description: "All AI recommendations are reviewed and approved by licensed physicians"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your medical data is encrypted and protected with bank-level security"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get prescription recommendations in minutes, not days"
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Receive digital prescriptions that can be sent directly to your pharmacy"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Access AI prescription services anytime, anywhere"
    }
  ];

  return (
    <section id="prescriptions" className="py-20 bg-background">
      <div className="medical-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Prescriptions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of healthcare with AI-assisted prescriptions, 
            verified by licensed doctors for your safety and peace of mind.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="medical-card border-border/50 hover:border-primary/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center border border-primary/10">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Try AI Prescriptions?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            To enable AI prescription features and secure medical data storage, 
            connect your HealWise account to our secure Supabase backend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="medical" size="lg">
              Connect Supabase Backend
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Secure database • Authentication • File storage • Edge functions
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionSection;