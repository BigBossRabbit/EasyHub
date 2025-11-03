import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, DollarSign, ExternalLink, Zap, Users, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="Bitcoin Jobs — Earn Sats" description="Turn your existing skills into Bitcoin earnings. Find remote opportunities that pay in the world's hardest money." canonical="/jobs" />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
              <Link to="/freedomtech" className="text-muted-foreground hover:text-primary transition-colors">~/freedomtech</Link>
              <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
              <Link to="/jobs" className="text-primary">~/jobs</Link>
              <Link to="/install" className="text-muted-foreground hover:text-primary transition-colors">~/install</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-primary">&gt;</span> Bitcoin Jobs
            <br />
            <span className="text-primary">&gt;</span> Earn Sats
            <br />
            <span className="text-primary">&gt;</span> Build Freedom
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your existing skills into Bitcoin earnings. Find remote opportunities 
            that pay in the world's hardest money.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <a href="https://bitcoinerjobs.com/" target="_blank" rel="noopener noreferrer">
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="container mx-auto px-6 py-16 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> Remote Bitcoin Jobs
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse opportunities from Bitcoiner Jobs - the premier global Bitcoin job board
            </p>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-16">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Briefcase className="h-5 w-5" />
                <span className="font-semibold">Bitcoiner Jobs - Live Job Board</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time Bitcoin job listings from our trusted partner
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <img src="/1.png" alt="Bitcoiner Jobs" className="h-12 w-15" />
                  <span className="text-xs font-medium text-primary">Powered by Bitcoiner Jobs</span>
                </div>
              </div>
            </div>
            
            <div className="w-full flex justify-center">
              <iframe 
                src="https://bitcoinerjobs.com/embed/jobs?remote=true" 
                width="500" 
                height="600" 
                style={{border: 0, borderRadius: '8px', background: '#f0f0f0'}}
                title="Bitcoiner Jobs Remote Bitcoin Jobs"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Having trouble viewing jobs?
              </p>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://bitcoinerjobs.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Bitcoiner Jobs Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
