import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scan, Upload, Camera, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedResult, setScannedResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      setIsScanning(true);
      toast.success("Camera access granted!");
      
      // Simulate scanning process
      setTimeout(() => {
        setScannedResult("https://safekart.example.com/product/ABC123");
        setIsScanning(false);
        stream.getTracks().forEach(track => track.stop());
        toast.success("QR code scanned successfully!");
      }, 3000);
    } catch (error) {
      setHasPermission(false);
      toast.error("Camera access denied. Please allow camera access or upload an image.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code processing from image
      setTimeout(() => {
        setScannedResult("https://safekart.example.com/product/XYZ789");
        toast.success("QR code detected in uploaded image!");
      }, 1500);
    }
  };

  const resetScanner = () => {
    setScannedResult("");
    setIsScanning(false);
    setHasPermission(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <Scan className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QR Code Scanner
            </h1>
            <p className="text-xl text-muted-foreground">
              Scan QR codes using your camera or upload an image
            </p>
          </div>

          {/* Scanner Interface */}
          <Card className="glass-card slide-in-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">QR Code Reader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!scannedResult ? (
                <>
                  {/* Camera Scanner */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Camera Scanner</h3>
                    
                    {isScanning ? (
                      <Card className="glass-card border-primary/50">
                        <CardContent className="p-8 text-center">
                          <div className="relative">
                            <div className="w-64 h-64 mx-auto border-2 border-primary rounded-lg bg-muted/20 flex items-center justify-center">
                              <div className="animate-pulse">
                                <Camera className="h-16 w-16 text-primary" />
                              </div>
                            </div>
                            <div className="absolute inset-0 border-2 border-accent rounded-lg animate-pulse"></div>
                          </div>
                          <p className="mt-4 text-muted-foreground">
                            Point your camera at a QR code to scan...
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => setIsScanning(false)}
                          >
                            Cancel Scanning
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <Button
                        onClick={requestCameraPermission}
                        className="w-full hero-button text-lg py-6"
                        disabled={hasPermission === false}
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Start Camera Scanner
                      </Button>
                    )}

                    {hasPermission === false && (
                      <Card className="glass-card border-yellow-500/50 bg-yellow-500/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="h-6 w-6 text-yellow-400" />
                            <div>
                              <h3 className="font-semibold text-yellow-400">Camera Access Required</h3>
                              <p className="text-sm text-muted-foreground">
                                Please allow camera access or use the file upload option below.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Upload QR Code Image</h3>
                    <div className="space-y-2">
                      <Label htmlFor="qr-upload" className="text-base font-medium">
                        Select image containing QR code
                      </Label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="glass-card flex-1"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choose Image File
                        </Button>
                      </div>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Scan Result */
                <div className="space-y-6">
                  <Card className="glass-card border-green-500/50 bg-green-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <h3 className="font-semibold text-green-400">QR Code Detected!</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Scanned Content:
                          </Label>
                          <div className="mt-2 p-4 bg-muted/20 rounded-lg border">
                            <p className="text-sm break-all">{scannedResult}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(scannedResult);
                              toast.success("Copied to clipboard!");
                            }}
                            className="flex-1"
                          >
                            Copy Content
                          </Button>
                          {scannedResult.startsWith('http') && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(scannedResult, '_blank')}
                              className="flex-1"
                            >
                              Open Link
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={resetScanner}
                    className="w-full hero-button"
                  >
                    Scan Another QR Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;