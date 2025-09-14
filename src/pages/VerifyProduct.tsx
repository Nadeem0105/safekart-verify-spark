import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle, Shield, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const VerifyProduct = () => {
  const [barcode, setBarcode] = useState("");
  const [weight, setWeight] = useState("");
  const [mrp, setMrp] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (!barcode || !weight || !mrp || !expiryDate) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsVerifying(false);
    setIsVerified(true);
    toast.success("Product verified successfully!");
    
    // Reset verification status after 3 seconds
    setTimeout(() => {
      setIsVerified(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Verify Product
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter product details to verify authenticity
            </p>
          </div>

          {/* Verification Form */}
          <Card className="glass-card slide-in-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Barcode */}
              <div className="space-y-2">
                <Label htmlFor="barcode" className="text-base font-medium">
                  Barcode
                </Label>
                <Input
                  id="barcode"
                  placeholder="Enter product barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="glass-card text-base"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base font-medium">
                  Weight (grams)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in grams"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="glass-card text-base"
                />
              </div>

              {/* MRP */}
              <div className="space-y-2">
                <Label htmlFor="mrp" className="text-base font-medium">
                  MRP (₹)
                </Label>
                <Input
                  id="mrp"
                  type="number"
                  placeholder="Enter MRP"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="glass-card text-base"
                />
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal glass-card text-base",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Verify Button */}
              <div className="pt-6">
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying || isVerified}
                  className={cn(
                    "w-full text-lg py-6 transition-all duration-500",
                    isVerified 
                      ? "bg-green-600 hover:bg-green-600" 
                      : "hero-button"
                  )}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying Product...
                    </>
                  ) : isVerified ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Product Verified!
                    </>
                  ) : (
                    "Verify Item"
                  )}
                </Button>
              </div>

              {/* Verification Result */}
              {isVerified && (
                <Card className="glass-card border-green-500/50 bg-green-500/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <div>
                        <h3 className="font-semibold text-green-400">Verification Successful</h3>
                        <p className="text-sm text-muted-foreground">
                          This product is authentic and safe to use.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyProduct;