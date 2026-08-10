import { Button } from "@/components/ui/button";
import { Newspaper, FileText, Scale, Shield, ArrowRight, Zap, Briefcase, Code } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const ORGANIZATION_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EasySats",
  "url": "https://bitcoin.okinent.org",
  "logo": "https://bitcoin.okinent.org/easysats-logo.png",
  "description": "Namibia's First Bitcoin Revolution: Don't Just Buy Bitcoin. Earn It. We provide tools for earning, buying, accepting, and storing Bitcoin.",
  "foundingDate": "2022",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Namibia"
  },
  "sameAs": [
    "https://github.com/BigBossRabbit",
    "https://twitter.com/EasySats_NA"
  ]
});

const WEBSITE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EasySats",
  "url": "https://bitcoin.okinent.org",
  "description": "Namibia's First Bitcoin Revolution: Don't Just Buy Bitcoin. Earn It.",
  "publisher": {
    "@type": "Organization",
    "name": "EasySats"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://bitcoin.okinent.org/easyjobs?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

const EasySatsHub = () => {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      <Seo
        title="EasySats | Don't Just Buy Bitcoin. Earn It."
        description="Namibia's First Bitcoin Revolution. Join TimeForce, find Bitcoin careers on EasyJobs, or freelance on EasyDevs."
        image="/easysats-logo.png"
        type="website"
        schemas={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]}
      />

      <main className="pt-4 pb-12">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-10 md:py-16 text-center relative overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 blur-[100px] rounded-full -z-10 animate-pulse delay-700" />

          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="h-4 w-4 fill-primary" />
              <span>Namibia's First Bitcoin Revolution</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-foreground">
              Don't Just Buy Bitcoin. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-shimmer">Earn It.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              We provide the tools and platforms to help you stack sats through your skills, time, and dedication.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full group" disabled>
                Returning Soon
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-full border-white/10 hover:bg-white/5" asChild>
                <Link to="/insights">
                  Read Chronicle
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Earn Section */}
        <section className="container mx-auto px-6 py-12 bg-black/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Earning Opportunities</h2>
                <p className="text-muted-foreground text-lg">Choose your path to financial sovereignty.</p>
              </div>
              <div className="h-1 bg-primary w-24 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* TimeForce */}
              <Link to="/timeforce" className="group">
                <div className="h-full p-8 rounded-3xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="h-24 w-24" />
                  </div>
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/20">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">TimeForce</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      Exchange time and skills for Sats. Join our lightning-fast gig economy.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-primary font-bold">
                    Join Network <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* EasyJobs */}
              <Link to="/easyjobs" className="group">
                <div className="h-full p-8 rounded-3xl bg-card border border-white/10 hover:border-secondary/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Briefcase className="h-24 w-24" />
                  </div>
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/20">
                      <Briefcase className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">EasyJobs</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      Find Bitcoin-only careers. Connect with companies paying in sound money.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-secondary font-bold">
                    View Careers <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* EasyDevs */}
              <Link to="/easydevs" className="group">
                <div className="h-full p-8 rounded-3xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Code className="h-24 w-24" />
                  </div>
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/20">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">EasyDevs</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      Freelance developer marketplace. Build the tools of freedom for Bitcoin.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-primary font-bold">
                    Start Bounties <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Link Footer Action */}
        <section className="container mx-auto px-6 py-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button variant="ghost" className="h-16 border border-white/5 hover:bg-white/5 rounded-2xl" asChild>
              <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5 opacity-50" />
                Whitepaper
              </a>
            </Button>
            <Button variant="ghost" className="h-16 border border-white/5 hover:bg-white/5 rounded-2xl" asChild>
              <Link to="/insights">
                <Newspaper className="mr-2 h-5 w-5 opacity-50" />
                Chronicle
              </Link>
            </Button>
            <Button variant="ghost" className="h-16 border border-white/5 hover:bg-white/5 rounded-2xl" asChild>
              <Link to="/terms">
                <Scale className="mr-2 h-5 w-5 opacity-50" />
                Terms
              </Link>
            </Button>
            <Button variant="ghost" className="h-16 border border-white/5 hover:bg-white/5 rounded-2xl" asChild>
              <Link to="/privacy">
                <Shield className="mr-2 h-5 w-5 opacity-50" />
                Privacy
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EasySatsHub;
