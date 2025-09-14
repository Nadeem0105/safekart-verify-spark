import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, QrCode, CheckCircle, Truck, Scan } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Product Verification",
      description: "Verify any product's authenticity in seconds with manual entry of details",
      href: "/verify",
      delay: "0ms"
    },
    {
      icon: Scan,
      title: "Scan QR Code",
      description: "Use your camera to scan QR codes instantly for quick verification",
      href: "/scan",
      delay: "150ms"
    },
    {
      icon: QrCode,
      title: "Generate QR Code",
      description: "Create QR codes for text, URLs, or any information you need to share",
      href: "/generate",
      delay: "300ms"
    },
    {
      icon: Truck,
      title: "Track Your Order",
      description: "Monitor your orders in real-time - Coming soon with advanced tracking",
      href: "/track",
      delay: "450ms",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <div className="flex justify-center mb-8">
            <Shield className="h-20 w-20 text-primary animate-pulse-glow" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Your Trusted Shopping Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Verify any product's authenticity in seconds. Ensure safety and quality with every purchase through our advanced IoT verification system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify">
              <Button size="lg" className="hero-button text-lg px-8 py-6">
                Start Verification
              </Button>
            </Link>
            <Link to="/scan">
              <Button size="lg" variant="outline" className="glass-card text-lg px-8 py-6">
                Scan QR Code
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ensure product authenticity and shopping safety
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="feature-card relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-6 text-center">
                  {feature.comingSoon && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-accent to-primary text-white text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-primary animate-bounce-gentle" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Link to={feature.href}>
                    <Button 
                      variant="outline" 
                      className="w-full glass-card"
                      disabled={feature.comingSoon}
                    >
                      {feature.comingSoon ? "Coming Soon" : "Try Now"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-card max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose SafeKart?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-xl font-semibold mb-2">Secure Verification</h4>
                <p className="text-muted-foreground">Advanced IoT technology ensures authentic product verification</p>
              </div>
              <div>
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                <p className="text-muted-foreground">Get results in seconds, not minutes</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="text-xl font-semibold mb-2">Trusted Platform</h4>
                <p className="text-muted-foreground">Your safety and satisfaction is our priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;