import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const QRGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [generatedQR, setGeneratedQR] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text or URL to generate QR code");
      return;
    }

    setIsGenerating(true);
    
    // Simulate QR generation process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll use a placeholder QR code
    // In a real app, you'd use a QR code generation library
    const qrCodeData = `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <g fill="black">
          <!-- Simplified QR code pattern -->
          <rect x="20" y="20" width="20" height="20"/>
          <rect x="60" y="20" width="20" height="20"/>
          <rect x="100" y="20" width="20" height="20"/>
          <rect x="140" y="20" width="20" height="20"/>
          <rect x="20" y="40" width="20" height="20"/>
          <rect x="140" y="40" width="20" height="20"/>
          <rect x="20" y="60" width="20" height="20"/>
          <rect x="60" y="60" width="20" height="20"/>
          <rect x="100" y="60" width="20" height="20"/>
          <rect x="140" y="60" width="20" height="20"/>
          <rect x="20" y="80" width="20" height="20"/>
          <rect x="140" y="80" width="20" height="20"/>
          <rect x="20" y="100" width="20" height="20"/>
          <rect x="60" y="100" width="20" height="20"/>
          <rect x="100" y="100" width="20" height="20"/>
          <rect x="140" y="100" width="20" height="20"/>
          <rect x="20" y="120" width="20" height="20"/>
          <rect x="140" y="120" width="20" height="20"/>
          <rect x="20" y="140" width="20" height="20"/>
          <rect x="60" y="140" width="20" height="20"/>
          <rect x="100" y="140" width="20" height="20"/>
          <rect x="140" y="140" width="20" height="20"/>
          <rect x="20" y="160" width="20" height="20"/>
          <rect x="60" y="160" width="20" height="20"/>
          <rect x="100" y="160" width="20" height="20"/>
          <rect x="140" y="160" width="20" height="20"/>
        </g>
        <text x="100" y="190" text-anchor="middle" font-size="10" fill="gray">QR Code</text>
      </svg>
    `)}`;
    
    setGeneratedQR(qrCodeData);
    setIsGenerating(false);
    toast.success("QR code generated successfully!");
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = generatedQR;
    link.click();
    toast.success("QR code downloaded!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputText);
    toast.success("Content copied to clipboard!");
  };

  const resetGenerator = () => {
    setInputText("");
    setGeneratedQR("");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <QrCode className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QR Code Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Create QR codes for text, URLs, or any information
            </p>
          </div>

          {/* Generator Interface */}
          <div className="grid gap-8">
            {/* Input Section */}
            <Card className="glass-card slide-in-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Enter Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="qr-text" className="text-base font-medium">
                    Text or URL
                  </Label>
                  <Textarea
                    id="qr-text"
                    placeholder="Enter text, URL, or any information you want to encode..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="glass-card min-h-[120px] text-base resize-none"
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples: Website URL, contact info, Wi-Fi credentials, plain text
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={generateQRCode}
                    disabled={isGenerating || !inputText.trim()}
                    className="flex-1 hero-button text-lg py-6"
                  >
                    {isGenerating ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="mr-2 h-5 w-5" />
                        Generate QR Code
                      </>
                    )}
                  </Button>
                  
                  {inputText && (
                    <Button
                      variant="outline"
                      onClick={copyToClipboard}
                      className="glass-card"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Generated QR Code Section */}
            {generatedQR && (
              <Card className="glass-card slide-in-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Generated QR Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 bg-white rounded-xl shadow-lg">
                      <img 
                        src={generatedQR} 
                        alt="Generated QR Code" 
                        className="w-64 h-64"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Encoded Content:
                    </Label>
                    <div className="p-4 bg-muted/20 rounded-lg border">
                      <p className="text-sm break-all">{inputText}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={downloadQRCode}
                      variant="outline"
                      className="flex-1 glass-card"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                    <Button
                      onClick={resetGenerator}
                      variant="outline"
                      className="glass-card"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tips Section */}
          <Card className="glass-card mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">💡 QR Code Tips</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Best Practices:</h4>
                  <ul className="space-y-1">
                    <li>• Keep text concise for better scanning</li>
                    <li>• Test QR codes before use</li>
                    <li>• Ensure good contrast when printing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Common Uses:</h4>
                  <ul className="space-y-1">
                    <li>• Website URLs</li>
                    <li>• Contact information</li>
                    <li>• Wi-Fi credentials</li>
                    <li>• Product information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;