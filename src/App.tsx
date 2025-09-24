import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FarmerDashboard from "./pages/FarmerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import Traceability from "./pages/Traceability";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ScanProduct } from "./pages/ScanProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/distributor" element={<DistributorDashboard />} />
          <Route path="/retailer" element={<RetailerDashboard />} />
          <Route path="/trace/:batchId" element={<Traceability />} />
          <Route path="/scan" element={<ScanProduct />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
