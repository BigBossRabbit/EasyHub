import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import EasySatsHub from "./pages/EasySatsHub";
import EasyDevs from "./pages/EasyDevs";
import TimeForce from "./pages/TimeForce";
import EasyJobs from "./pages/EasyJobs";
import Install from "./pages/Install";
import About from "./pages/About";
import ConnectExplore from "./pages/ConnectExplore";
import TPOK from "./pages/TPOK";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/EasyHub">
          <Routes>
            <Route path="/" element={<EasySatsHub />} />
            <Route path="/easydevs" element={<EasyDevs />} />
            <Route path="/timeforce" element={<TimeForce />} />
            <Route path="/easyjobs" element={<EasyJobs />} />
            <Route path="/install" element={<Install />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<ConnectExplore />} />
            <Route path="/tpok" element={<TPOK />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
