import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import EasySatsHub from "./pages/EasySatsHub";
import EasyDevs from "./pages/EasyDevs";
import TimeForce from "./pages/TimeForce";
import EasyJobs from "./pages/EasyJobs";
import About from "./pages/About";
import ConnectExplore from "@/pages/ConnectExplore";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Dashboard from "./pages/Dashboard";
import TPOK from "./pages/TPOK";
import Contact from "./pages/Contact";
import EasyTours from "./pages/EasyTours";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Homepage without footer */}
            <Route path="/" element={<Layout><EasySatsHub /></Layout>} />

            {/* All other routes with footer via Layout */}
            <Route path="/easydevs" element={<Layout><EasyDevs /></Layout>} />
            <Route path="/timeforce" element={<Layout><TimeForce /></Layout>} />
            <Route path="/easyjobs" element={<Layout><EasyJobs /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/connect" element={<Layout><ConnectExplore /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/easystats" element={<Dashboard />} />
            <Route path="/tpok" element={<Layout><TPOK /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/easytours" element={<Layout><EasyTours /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
