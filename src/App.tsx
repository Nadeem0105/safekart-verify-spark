import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import VerifyProduct from "./pages/VerifyProduct";
import QRScanner from "./pages/QRScanner";
import Shopping from "./pages/Shopping";
import TrackOrder from "./pages/TrackOrder";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<VerifyProduct />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
