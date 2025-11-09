import { Button } from "@/components/ui/button";
import { Terminal, Code2, GitBranch, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const FreedomTech = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Seo title="FreedomTech — Open Source Opportunities" description="Explore open source projects & opportunities in the Bitcoin & freedom technology space." canonical="/freedomtech" />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
              <Link to="/freedomtech" className="text-primary">~/freedomtech</Link>
              <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
              <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">~/jobs</Link>
              <Link to="/install" className="text-muted-foreground hover:text-primary transition-colors">~/install</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="text-primary">$</span>
              <span className="animate-pulse">loading_open_source_opportunities...</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-primary">&gt;</span> FreedomTech
              <br />
              <span className="text-primary">&gt;</span> Open Source
              <br />
              <span className="text-primary">&gt;</span> Opportunities
            </h1>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Code2 className="h-5 w-5" />
              <span className="font-semibold">// About FreedomTech</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Explore open source projects & opportunities in the Bitcoin & freedom technology space. 
              Contribute to building a more sovereign future through code, design, and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-sm mb-2">
            <Terminal className="h-4 w-4" />
            <span>cat opportunities.json</span>
          </div>
          <h2 className="text-3xl font-bold">Available Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Time2Build Project */}
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors relative overflow-hidden">
            {/* Techy Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="absolute top-4 right-4 w-16 h-16 border border-primary/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border border-primary/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/10 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Terminal className="h-8 w-8 text-primary" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-mono">TIME2BUILD</span>
                    <div className="flex items-center gap-1 text-xs text-green-500 font-mono">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">REMOTE</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 font-mono">Time2Build Bitcoin Development by Breez</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join a worldwide developer challenge to bring bitcoin to the world's leading Open-Source applications & services using the Breez SDK. 
                The goal is not to build another Bitcoin wallet, but to integrate Bitcoin into popular Open-Source apps that already exist.
              </p>
              
              {/* Additional Details */}
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded">
                <div className="text-xs text-primary font-mono mb-2">PROGRAM DETAILS:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Remote Bitcoin development opportunities</li>
                  <li>• Work on real-world Open-Source projects</li>
                  <li>• Contribute to the Bitcoin ecosystem</li>
                  <li>• $25,000 prize pool to be won!</li>
                </ul>
              </div>
              
              {/* Tech Stack Visualization */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground font-mono">STACK:</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Bitcoin', 'Lightning', 'Rust', 'C++', 'JavaScript', 'Python', 'Breez SDK'].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Terminal Status */}
              <div className="mb-4 p-2 bg-black/50 rounded font-mono text-xs">
                <div className="text-green-400 mb-1">
                  <span className="text-primary">$</span> time2build --status
                </div>
                <div className="text-green-400">
                  ✓ Program active • ✓ Remote positions available • ✓ Bitcoin focus
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://www.time2build.dev/" target="_blank" rel="noopener noreferrer">
                    <Code2 className="h-3 w-3" />
                    Learn More & Submit Your Project
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Placeholder for Future Project */}
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors relative overflow-hidden">
            {/* Subtle Tech Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent"></div>
              <div className="absolute top-6 left-6 w-12 h-12 border border-primary/20 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-6 h-6 border border-primary/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <GitBranch className="h-8 w-8 text-primary" />
                <span className="text-xs text-muted-foreground font-mono">COMING SOON</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">More Projects Coming</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We're constantly adding new Bitcoin & freedom tech opportunities. 
                Stay tuned for more exciting projects.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" disabled>
                  <ExternalLink className="h-3 w-3" />
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-card border border-primary/50 rounded-lg p-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Terminal className="h-5 w-5" />
            <span className="font-semibold">// Want to submit a project?</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Have an open source Bitcoin or freedom tech project? We'd love to feature it here.
          </p>
          <Button className="gap-2">
            <Code2 className="h-4 w-4" />
            Submit Project
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FreedomTech;
