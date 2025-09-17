import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify Product" },
    { href: "/scan", label: "QR Scanner" },
    { href: "/shopping", label: "Shopping" },
    { href: "/track", label: "Track Order" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SafeKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  className="text-sm transition-all duration-300"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2 transition-all duration-300"
              title={`Switch to ${theme === 'futuristic' ? 'Corporate' : 'Futuristic'} theme`}
            >
              <Palette className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-full justify-start"
            >
              <Palette className="h-4 w-4 mr-2" />
              Switch to {theme === 'futuristic' ? 'Corporate' : 'Futuristic'} Theme
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};