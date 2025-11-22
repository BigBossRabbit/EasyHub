import { Button } from "@/components/ui/button";
import { Newspaper, Menu, FileText, Scale, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { StackerNewsFeed } from "@/components/StackerNewsFeed";

const EasySatsHub = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Seo title="EasySats Chronicle" description="Namibia's First Bitcoin Revolution: Easy, Accessible & Unstoppable" />
      <header className="border-b-4 border-primary bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-center space-y-2 w-full">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px flex-1 bg-primary md:hidden"></div>
                <img src="easysats-logo.png" alt="EasySats" className="h-12 w-12" />
                <div className="h-px flex-1 bg-primary md:hidden"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wider">
                THE EASYSATS CHRONICLE
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground tracking-widest">
                BUILDING TOMORROW, TODAY • EST. BLOCKHEIGHT 736,253 • NAMIBIA
              </p>
            </div>

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
                    <Link to="/about" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">About</Link>
                    <Link to="/connect" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">Connect</Link>
                    <Link to="/easydevs" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">EasyDevs</Link>
                    <Link to="/easyjobs" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">EasyJobs</Link>
                    <Link to="/timeforce" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">TimeForce</Link>
                    <Link to="/tpok" className="text-lg font-semibold hover:text-primary transition-colors uppercase tracking-wide">TPOK</Link>

                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap justify-between items-center gap-x-4 gap-y-2 text-sm font-serif border-t border-b border-border py-4 mt-8 w-full">
            <Link to="/about" className="hover:text-primary transition-colors uppercase tracking-wide">About</Link>
            <Link to="/connect" className="hover:text-primary transition-colors uppercase tracking-wide">Connect</Link>
            <Link to="/easydevs" className="hover:text-primary transition-colors uppercase tracking-wide">EasyDevs</Link>
            <Link to="/easyjobs" className="hover:text-primary transition-colors uppercase tracking-wide">EasyJobs</Link>
            <Link to="/timeforce" className="hover:text-primary transition-colors uppercase tracking-wide">TimeForce</Link>
            <Link to="/tpok" className="hover:text-primary transition-colors uppercase tracking-wide">TPOK</Link>

          </nav>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-2">Featured Story</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                Namibia's First Bitcoin Revolution: Easy, Accessible & Unstoppable
              </h2>
            </div>

            <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed font-serif space-y-4">
              <p className="text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2">
                At EasySats, it is our mission to find ways that allow users to easily purchase Bitcoin,
                while using our accumulated expertise & technical knowledge to ensure that not only can
                people purchase it, but they are made aware of how they can earn & accept it for their goods &
                services as well as securely store it themselves.
              </p>

              <p>
                We are accessible to people of all income levels, to purposefully be inclusive of those
                who are always excluded. Anyone can earn, purchase, accept & store Bitcoin using tailored
                solutions from us, regardless of their financial status or level of experience.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border-2 border-border p-6">
              <h3 className="text-xl font-serif font-bold mb-4 border-b border-border pb-2">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>First Bitcoin voucher system in Namibia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>Instant payment confirmation via Lightning Network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>No bank account or permission required</span>
                </li>
              </ul>
            </div>

            <Link to="/tpok" className="bg-primary/10 border border-primary p-6 block hover:bg-primary/20 transition-colors group">
              <Newspaper className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary transition-colors">TPOK - The Proof of Knowledge</h3>
              <p className="text-sm text-muted-foreground">Explore Bitcoin education resources & learning materials →</p>
            </Link>
          </div>
        </div>

        {/* Stacker News Section - Full Width */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="h-[450px] w-full">
            <StackerNewsFeed />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Button size="lg" className="font-serif" asChild>
            <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Bitcoin Whitepaper
            </a>
          </Button>

          <Button size="lg" className="font-serif bg-neutral-900 hover:bg-neutral-800 text-white" asChild>
            <Link to="/terms">
              <Scale className="mr-2 h-4 w-4" />
              Terms & Conditions
            </Link>
          </Button>
          <Button size="lg" className="font-serif bg-neutral-900 hover:bg-neutral-800 text-white" asChild>
            <Link to="/privacy">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EasySatsHub;
