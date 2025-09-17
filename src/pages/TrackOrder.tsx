port { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, Truck, MapPin, CheckCircle } from "lucide-react";
import heroTracking from "@/assets/hero-tracking.jpg";

interface OrderStatus {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

interface OrderDetails {
  orderId: string;
  productName: string;
  productImage: string;
  orderDate: string;
  expectedDelivery: string;
  currentStatus: string;
  trackingNumber: string;
  shippingAddress: string;
  statuses: OrderStatus[];
}

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock order data - in real app, this would come from an API
  const mockOrders: Record<string, OrderDetails> = {
    "SK123456789": {
      orderId: "SK123456789",
      productName: "Verified Organic Honey - 500ml",
      productImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop&crop=entropy&auto=format",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-20",
      currentStatus: "shipped",
      trackingNumber: "TRK789123456",
      shippingAddress: "123 Main Street, City, State 12345",
      statuses: [
        {
          id: "1",
          title: "Order Confirmed",
          timestamp: "2024-01-15 10:30 AM",
          completed: true,
        },
        {
          id: "2",
          title: "Product Verified & Packaged",
          timestamp: "2024-01-15 02:15 PM",
          completed: true,
        },
        {
          id: "3",
          title: "Shipped",
          timestamp: "2024-01-16 09:00 AM",
          completed: true,
          current: true,
        },
        {
          id: "4",
          title: "Out for Delivery",
          timestamp: "Expected: 2024-01-20 10:00 AM",
          completed: false,
        },
        {
          id: "5",
          title: "Delivered",
          timestamp: "Expected: 2024-01-20 06:00 PM",
          completed: false,
        },
      ],
    },
  };

  const handleTrackOrder = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId.toUpperCase()];
      setOrderDetails(order || null);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-processing";
      case "packaged":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (index: number, completed: boolean, current?: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-status-delivered drop-shadow-lg" />;
    }
    if (current) {
      return (
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-accent to-safekart-primary flex items-center justify-center glow">
          <div className="h-3 w-3 rounded-full bg-foreground animate-pulse" />
        </div>
      );
    }
    return (
      <div className="h-6 w-6 rounded-full border-2 border-muted bg-background/50 backdrop-blur-sm" />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-3xl overflow-hidden glow">
          <img 
            src={heroTracking} 
            alt="Order tracking - SafeKart futuristic dashboard"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-primary flex items-center">
            <div className="px-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Track Your Order
              </h1>
              <p className="text-foreground/90 text-lg">
                Enter your order ID to get real-time updates on your SafeKart purchase
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold text-foreground">Track Order</h2>
          </div>
          <div className="flex gap-4">
            <input
              placeholder="Enter Order ID (e.g., SK123456789)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 bg-muted/20 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
            />
            <button 
              onClick={handleTrackOrder} 
              disabled={!orderId.trim() || loading}
              className="btn-gradient px-6 py-3 rounded-xl text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Tracking...
                </div>
              ) : (
                "Track Order"
              )}
            </button>
          </div>
        </div>

        {orderDetails && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Order #{orderDetails.orderId}</h3>
                  <p className="text-muted-foreground">
                    Placed on {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm bg-${getStatusColor(orderDetails.currentStatus)}/10 text-${getStatusColor(orderDetails.currentStatus)} border-${getStatusColor(orderDetails.currentStatus)}/20`}>
                  {orderDetails.currentStatus.toUpperCase()}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <img 
                    src={orderDetails.productImage} 
                    alt={orderDetails.productName}
                    className="w-20 h-20 object-cover rounded-xl border border-border/20"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{orderDetails.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Tracking: {orderDetails.trackingNumber}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">{orderDetails.shippingAddress}</span>
                  </div>
                  <p className="text-sm text-foreground">
                    <strong className="text-accent">Expected Delivery:</strong>{" "}
                    {new Date(orderDetails.expectedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-semibold text-foreground">Order Timeline</h3>
              </div>
              <div className="space-y-6">
                {orderDetails.statuses.map((status, index) => (
                  <div key={status.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(index, status.completed, status.current)}
                      {index < orderDetails.statuses.length - 1 && (
                        <div className={`w-0.5 h-12 mt-2 rounded-full ${
                          status.completed ? 'bg-gradient-to-b from-status-delivered to-accent' : 'bg-muted/30'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className={`font-semibold ${
                        status.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {status.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {status.timestamp}
                      </p>
                      {status.current && (
                        <div className="mt-3 p-3 rounded-xl bg-accent/10 border border-accent/20 backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-accent" />
                            <span className="text-sm text-accent font-medium">
                              Currently in transit
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {orderId && !orderDetails && !loading && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-accent/60" />
            <h3 className="text-xl font-semibold mb-3 text-foreground">Order Not Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Please check your order ID and try again. Make sure you've entered the correct format.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
