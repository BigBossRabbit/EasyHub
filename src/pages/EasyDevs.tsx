import { Button } from "@/components/ui/button";
import { Terminal, Code2, GitBranch, ExternalLink, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BountyBoard, BOUNTY_PLATFORMS, BOUNTY_DATA } from "@/components/BountyBoard";
import { SovereignKey } from "@/components/SovereignKey";
import { useEffect, useState } from "react";



const EasyDevs = () => {
  const [checkingIndex, setCheckingIndex] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [platforms, setPlatforms] = useState(BOUNTY_PLATFORMS);

  // Simulate real-time checking effect (lifted from BountyBoard)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly "check" one of the platforms
      const randomIndex = Math.floor(Math.random() * platforms.length);
      setCheckingIndex(randomIndex);

      setTimeout(() => {
        setCheckingIndex(null);
        setLastChecked(new Date());

        // Update the top bounty for this platform
        setPlatforms(currentPlatforms => {
          const newPlatforms = [...currentPlatforms];
          const platformName = newPlatforms[randomIndex].name;
          const platformBounties = BOUNTY_DATA[platformName as keyof typeof BOUNTY_DATA];
          if (platformBounties) {
            const randomBounty = platformBounties[Math.floor(Math.random() * platformBounties.length)];
            newPlatforms[randomIndex] = {
              ...newPlatforms[randomIndex],
              topBounty: randomBounty
            };
          }
          return newPlatforms;
        });
      }, 2000); // "Check" takes 2 seconds
    }, 60 * 1000); // Run every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper to find the "highest" bounty
  // For simplicity, we'll prioritize BTC amounts over USD, and higher numbers
  const getHighestBounty = () => {
    let highest = platforms[0];
    let highestValue = 0;

    platforms.forEach(p => {
      let value = 0;
      if (p.topBounty.amount.includes("BTC")) {
        value = parseFloat(p.topBounty.amount.replace(" BTC", "")) * 100000; // Weight BTC heavily
      } else if (p.topBounty.amount.includes("$")) {
        value = parseFloat(p.topBounty.amount.replace(/[^0-9.]/g, ""));
      }

      if (value > highestValue) {
        highestValue = value;
        highest = p;
      }
    });

    return {
      title: highest.topBounty.title,
      platform: highest.name,
      reward: highest.topBounty.amount,
      type: (highest.topBounty.tags || highest.tags).join(" / "),
      color: highest.name === "Bitcoin Bounties" ? "text-orange-500" :
        highest.name === "HackenProof" ? "text-green-500" :
          highest.name === "Bitaps" ? "text-red-500" : "text-purple-500"
    };
  };

  const currentBounty = getHighestBounty();

  return (
    <div className="min-h-screen text-foreground font-mono">
      <Seo title="EasyDevs — Open Source Opportunities" description="Explore open source projects & opportunities in the Bitcoin & freedom technology space." canonical="/easydevs" />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
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
              <Link to="/easydevs" className="text-primary">~/easydevs</Link>
              <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
              <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
              <Link to="/easytours" className="text-muted-foreground hover:text-primary transition-colors">~/easytours</Link>
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
                    <Link to="/easytours" className="text-lg font-semibold hover:text-primary transition-colors">~/easytours</Link>
                    <Link to="/tpok" className="text-lg font-semibold hover:text-primary transition-colors">~/tpok</Link>

                  </nav>
                </SheetContent>
              </Sheet>
            </div>
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
              <span className="text-primary">&gt;</span> EasyDevs
              <br />
              <span className="text-primary">&gt;</span> Open Source
              <br />
              <span className="text-primary">&gt;</span> Opportunities
            </h1>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4 mb-6">
            <div className="flex items-center gap-2 text-primary">
              <Code2 className="h-5 w-5" />
              <span className="font-semibold">// About EasyDevs</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Explore open source projects & opportunities in the Bitcoin & freedom technology space.
              Contribute to building a more sovereign future through code, design, and innovation.
            </p>
          </div>

          {/* Highest Bounty Terminal Display */}
          <div className="bg-black/80 border border-green-500/30 rounded-lg p-4 font-mono text-sm shadow-lg shadow-green-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="text-green-400 mb-2 flex items-center gap-2">
              <span className="text-primary">$</span>
              <span className="animate-pulse">fetch_highest_bounty.sh</span>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">Searching available platforms...</div>
              <div className="text-gray-400">Analyzing reward pools...</div>
              <div className={`mt-2 ${currentBounty.color}`}>FOUND: {currentBounty.title}</div>
              <div className="pl-4 text-gray-300">
                <span className="text-purple-400">Platform:</span> {currentBounty.platform}<br />
                <span className="text-purple-400">Reward:</span> <span className="text-yellow-400 font-bold">{currentBounty.reward}</span><br />
                <span className="text-purple-400">Type:</span> {currentBounty.type}
              </div>
            </div>
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
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded space-y-3">
                <div>
                  <div className="text-xs text-primary font-mono mb-1">PROGRAM DETAILS:</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Remote Bitcoin development opportunities</li>
                    <li>• Work on real-world Open-Source projects</li>
                    <li>• Contribute to the Bitcoin ecosystem</li>
                    <li>• $25,000 prize pool to be won!</li>
                  </ul>
                </div>

                <div>
                  <div className="text-xs text-primary font-mono mb-1">JUDGING CRITERIA:</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <span className="text-foreground">Impact:</span> Potential to drive Bitcoin adoption</li>
                    <li>• <span className="text-foreground">Quality:</span> Code architecture and implementation</li>
                    <li>• <span className="text-foreground">UX/UI:</span> Ease of use and design aesthetics</li>
                    <li>• <span className="text-foreground">Innovation:</span> Creative use of Breez SDK features</li>
                  </ul>
                </div>

                <div>
                  <div className="text-xs text-primary font-mono mb-1">TIMELINE:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="text-foreground block">Registration:</span>
                      Open Now
                    </div>
                    <div>
                      <span className="text-foreground block">Submission Deadline:</span>
                      Dec 16, 2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Visualization */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground font-mono">STACK:</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
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

          {/* SovereignKey Project */}
          <SovereignKey />

          {/* Bounty Board - Full Width */}
          <div className="md:col-span-2">
            <BountyBoard
              platforms={platforms}
              checkingIndex={checkingIndex}
              lastChecked={lastChecked}
            />
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

export default EasyDevs;
