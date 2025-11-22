import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  Zap,
  Users,
  Globe,
  ArrowRight,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const EasyJobs = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Seo title="EasyJobs — Earn Sats" description="Turn your existing skills into Bitcoin earnings. Find remote opportunities that pay in the world's hardest money." canonical="/easyjobs" />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">~/about</Link>
              <Link to="/connect" className="text-muted-foreground hover:text-primary transition-colors">~/connect</Link>
              <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
              <Link to="/easyjobs" className="text-primary">~/easyjobs</Link>
              <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
              <Link to="/tpok" className="text-muted-foreground hover:text-primary transition-colors">~/tpok</Link>

            </nav>

            {/* Mobile Navigation (Hamburger Menu) */}
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 pt-8">
                    <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">~/home</Link>
                    <Link to="/about" className="text-lg font-semibold hover:text-primary transition-colors">~/about</Link>
                    <Link to="/connect" className="text-lg font-semibold hover:text-primary transition-colors">~/connect</Link>
                    <Link to="/easydevs" className="text-lg font-semibold hover:text-primary transition-colors">~/easydevs</Link>
                    <Link to="/easyjobs" className="text-lg font-semibold hover:text-primary transition-colors">~/easyjobs</Link>
                    <Link to="/timeforce" className="text-lg font-semibold hover:text-primary transition-colors">~/timeforce</Link>
                    <Link to="/tpok" className="text-lg font-semibold hover:text-primary transition-colors">~/tpok</Link>

                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
            <span className="text-primary">$</span>
            <span className="animate-pulse">loading_easyjobs...</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-primary">&gt;</span> EasyJobs
            <br />
            <span className="text-primary">&gt;</span> Earn Sats
            <br />
            <span className="text-primary">&gt;</span> Build Freedom
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your existing skills into Bitcoin earnings. Find remote opportunities
            that pay in the world's hardest money.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Browse EasyJobs
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://bitcoinerjobs.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Visit Bitcoiner Jobs
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Bitcoin Jobs Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> Why Earn Bitcoin?
            </h2>
            <p className="text-xl text-muted-foreground">
              Your skills deserve the world's hardest money
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* True Ownership */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Hard Money</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Bitcoin is the hardest money ever created. When you earn Bitcoin,
                you're earning something that can't be inflated away.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Fixed supply of up to 21 million Bitcoin</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Decentralized & censorship-resistant</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Global Medium of Exchange & Store of value for the future</span>
                </li>
              </ul>
            </div>

            {/* Global Access */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Global Opportunities</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Bitcoin jobs are typically remote-first, giving you access to
                opportunities worldwide without geographic limitations.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Work from anywhere - even on a beach</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>No currency conversion fees - you get paid in Bitcoin</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Borderless payments - you can receive Bitcoin globally</span>
                </li>
              </ul>
            </div>

            {/* Skill Utilization */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Use Your Skills</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Bitcoin companies need all types of professionals - developers,
                designers, marketers, writers & more.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Technical & non-technical roles available</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Full-time & freelance opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <span>Growing industry with high demand for industry-specific skills</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="container mx-auto px-6 py-16 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> Remote EasyJobs
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse opportunities from Bitcoiner Jobs - the premier global Bitcoin job board
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Job Board Embed */}
            <div className="bg-background border border-border rounded-lg p-16">
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Briefcase className="h-5 w-5" />
                  <span className="font-semibold">Bitcoiner Jobs - Live Job Board</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time Bitcoin job listings from our trusted partner
                </p>

                {/* Bitcoiner Jobs Branding */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                    <img src="/EasyHub/1.png" alt="Bitcoiner Jobs" className="h-12 w-15" />
                    <span className="text-xs font-medium text-primary">Powered by Bitcoiner Jobs</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    External website
                  </div>
                </div>
              </div>

              {/* Bitcoiner Jobs Embed */}
              <div className="w-full flex justify-center">
                <div className="relative w-full">
                  {/* External website indicator */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      External
                    </div>
                  </div>

                  <iframe
                    src="https://bitcoinerjobs.com/embed/jobs?remote=true"
                    height="600"
                    style={{ border: 0, borderRadius: '8px', background: '#f0f0f0' }}
                    title="Bitcoiner Jobs Remote Bitcoin Jobs"
                    className="rounded-lg w-full"
                  />
                </div>
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

            {/* Job Categories & Tips */}
            <div className="space-y-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Popular Job Categories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm">
                    <span className="text-primary">•</span> Software Development
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Design & UX
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Marketing & Growth
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Content & Writing
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Community Management
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Business Development
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Operations
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> Legal & Compliance
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">•</span> and many more...
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Earning Tips
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    <span>Build your Bitcoin knowledge through free resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    <span>Contribute to open source Bitcoin projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    <span>Network in Bitcoin communities & events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    <span>Start with freelance gigs to build reputation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    <span>Upskill, Upskill, Upskill...</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Getting Started
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  New to Bitcoin? Start your journey with these resources:
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                    <a href="https://planb.network/en/courses?topics=bitcoin" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      PlanB - Free Bitcoin Education Courses
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                    <a href="https://www.lynalden.com/lightning-network/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Lightning Network Guide
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                    <a href="https://bitcoin.org/en/developer-documentation" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Bitcoin Developer Resources
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border border-primary/50 rounded-lg p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/EasyHub/2.png" alt="Bitcoiner Jobs" className="h-12 w-21" />
              <h2 className="text-3xl font-bold">
                Ready to Start Earning Bitcoin?
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Your skills are valuable. Make sure you're paid in the hardest money ever created.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://bitcoinerjobs.com/" target="_blank" rel="noopener noreferrer">
                  <Briefcase className="h-4 w-4" />
                  Browse EasyJobs Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Link to="/timeforce" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Join TimeForce
                </Link>
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Job listings powered by <strong>Bitcoiner Jobs</strong> - the premier global Bitcoin job board</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EasyJobs;