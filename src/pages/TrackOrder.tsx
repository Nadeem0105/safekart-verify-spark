import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Clock, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <Truck className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce-gentle" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Track Your Order
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time order tracking coming soon
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="glass-card slide-in-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🚀 Coming Soon!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-semibold">
                  Advanced Order Tracking is Under Development
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  We're building an amazing order tracking system that will give you real-time updates 
                  on your purchases. Stay tuned for this exciting feature!
                </p>
              </div>

              {/* Feature Preview */}
              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Real-time Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant notifications on your order status
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Delivery Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    Accurate delivery time predictions
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Smart Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Personalized updates via SMS and email
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  While you wait, you can explore our other amazing features:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/verify">
                    <Button variant="outline" className="glass-card">
                      Verify Products
                    </Button>
                  </Link>
                  <Link to="/scan">
                    <Button variant="outline" className="glass-card">
                      Scan QR Codes
                    </Button>
                  </Link>
                  <Link to="/generate">
                    <Button variant="outline" className="glass-card">
                      Generate QR Codes
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="glass-card mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Be the First to Know!
              </h3>
              <p className="text-muted-foreground mb-6">
                Want to be notified when order tracking goes live? We'll keep you updated!
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-muted/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="hero-button px-6">
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;