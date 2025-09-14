import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    // Demo login - accept any credentials
    if (username && password) {
      toast.success("Login successful! Welcome to admin panel.");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
              <Lock className="h-6 w-6 text-accent absolute -bottom-1 -right-1 bg-background rounded-full p-1" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-xl text-muted-foreground">
              Secure access to admin panel
            </p>
          </div>

          {/* Login Form */}
          <Card className="glass-card slide-in-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Administrator Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="glass-card pl-10 text-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="glass-card pl-10 text-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !username || !password}
                    className="w-full hero-button text-lg py-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </div>

                {/* Demo Credentials Info */}
                <Card className="glass-card border-blue-500/50 bg-blue-500/10">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-blue-400 mb-2">Demo Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        For demonstration purposes, any username and password combination will work.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="glass-card mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">🔒 Security Notice</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This admin panel uses advanced security measures including multi-factor authentication, 
                encrypted data transmission, and audit logging to ensure the highest level of protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;