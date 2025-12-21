import { Button } from "@/components/ui/button";
import {
  Clock,
  Shield,
  DollarSign,
  Users,
  BookOpen,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Briefcase,
  Menu,
  Send,
  Mail,
  User,
  MessageSquare,
  Hash
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const TimeForce = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    role: "agent",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[TimeForce Join Request] ${formData.role.toUpperCase()} - ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nTelegram: ${formData.telegram}\nRole: ${formData.role}\n\nMessage:\n${formData.message}`;

    window.location.href = `mailto:okin@okinent.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsJoinModalOpen(false);
  };

  const JoinForm = () => (
    <div className="space-y-6 py-4">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <form onSubmit={handleSubmit} className="relative bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2 tracking-widest uppercase">
              <User className="h-3 w-3" /> [Identity]
            </label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="YOUR NAME / ALIAS"
              className="w-full bg-background/50 border border-primary/20 rounded px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2 tracking-widest uppercase">
              <Mail className="h-3 w-3" /> [Comm_Link]
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL_ADDRESS"
              className="w-full bg-background/50 border border-primary/20 rounded px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2 tracking-widest uppercase">
              <Hash className="h-3 w-3" /> [Neural_Handle]
            </label>
            <input
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="@TELEGRAM_HANDLE"
              className="w-full bg-background/50 border border-primary/20 rounded px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2 tracking-widest uppercase">
              <Zap className="h-3 w-3" /> [Designation]
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-background/50 border border-primary/20 rounded px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="agent" className="bg-card">COMMERCIAL_AGENT</option>
              <option value="merchant" className="bg-card">BITCOIN_MERCHANT</option>
              <option value="dev" className="bg-card">TECH_DISRUPTOR</option>
              <option value="other" className="bg-card">OTHER_ACTOR</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2 tracking-widest uppercase">
              <MessageSquare className="h-3 w-3" /> [Transmission]
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="INTENT_DETAILS..."
              className="w-full bg-background/50 border border-primary/20 rounded px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none"
            />
          </div>

          <Button type="submit" className="w-full font-mono tracking-tighter hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Send className="h-4 w-4" />
            INITIATE_HANDSHAKE
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30">
      <Seo title="TimeForce — Bitcoin Onboarding Handbook" description="A structured approach to onboarding business owners with Bitcoin solutions." canonical="/timeforce" />

      <Sheet open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md border-l border-primary/20 bg-background/95 backdrop-blur-xl overflow-y-auto">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>

          <SheetHeader className="relative space-y-4 pt-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs">
              <span className="animate-pulse">&gt;</span> SYSTEM_READY
            </div>
            <SheetTitle className="text-3xl font-bold tracking-tighter flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              JOIN_TIMEFORCE
            </SheetTitle>
            <SheetDescription className="text-muted-foreground font-mono text-sm leading-relaxed border-l-2 border-primary/30 pl-4">
              Access the future of financial sovereignty. Join the decentralized network of Bitcoin pioneers.
            </SheetDescription>
          </SheetHeader>

          <JoinForm />

          <div className="relative mt-8 space-y-2 border-t border-border/50 pt-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-center">
            <p className="flex items-center justify-center gap-2">
              <Shield className="h-3 w-3" /> Encryption: Enabled
            </p>
            <p>Protocol: EasySats_Auth_v1.0.4</p>
          </div>
        </SheetContent>
      </Sheet>

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">~/about</Link>
              <Link to="/connect" className="text-muted-foreground hover:text-primary transition-colors">~/connect</Link>
              <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
              <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
              <Link to="/timeforce" className="text-primary">~/timeforce</Link>
              <Link to="/tpok" className="text-muted-foreground hover:text-primary transition-colors">~/tpok</Link>
            </nav>

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
            <span className="animate-pulse">loading_timeforce_handbook...</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-primary">&gt;</span> TimeForce
            <br />
            <span className="text-primary">&gt;</span> Bitcoin Onboarding
            <br />
            <span className="text-primary">&gt;</span> Handbook
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A structured approach to onboarding business owners with Bitcoin solutions.
            Keep it simple, stay confident & help others understand the power of true financial freedom.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2 shadow-[0_0_20px_rgba(var(--primary),0.2)]" onClick={() => setIsJoinModalOpen(true)}>
              <Users className="h-4 w-4" />
              Join TimeForce
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/easyjobs">
                <Briefcase className="h-4 w-4" />
                Find EasyJobs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 space-y-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-muted-foreground opacity-30">SEC_BLOCK_PROBLEM</div>
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-6 w-6" />
              <span className="text-2xl font-bold">The Problem</span>
            </div>

            <div className="space-y-4 text-muted-foreground relative z-10">
              <p className="text-lg">
                Many tend to complicate the easiest parts about Bitcoin when most will come to
                understand it the easiest by the use cases it solves.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="h-1 w-1 bg-destructive rounded-full" />
                    Banking Overreach
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>Monthly banking charges for storing your own money</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>Additional fees for missed payments, or chargebacks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>No warning or arrangement opportunities</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="h-1 w-1 bg-destructive rounded-full" />
                    Security Risks
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>Risk of robbery for cash transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>Shady bookkeepers & bad actors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive font-mono">[!]</span>
                      <span>System with No Representation, yet continued payments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> The Solution
            </h2>
            <p className="text-xl text-muted-foreground">
              Three key Bitcoin solutions that solve the problems above
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Ease of Usage</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                If you have ever used cell phone banking or recharged your cell phone with airtime,
                then you can receive, send & store Bitcoin by yourself.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Be your own bank</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>No permission needed to transact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Simple QR Code payments</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">True Ownership</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Unlike your bank account, your Bitcoin Application (Wallet) is owned by you
                if you choose to use Self-Custody.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Full ownership & responsibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Seed/Backup Phrase = Master Key</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Safer for vendors - no cash exchange</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Revenue Stream</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Accepting Bitcoin opens doors to new customers & revenue opportunities
                beyond traditional payment methods.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Serve international customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Enable Bitcoin earners to spend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Expand customer base</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="container mx-auto px-6 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> The Opportunity
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the #EasySats Bitcoin Network of Merchants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-semibold">Bitcoin Merchants</h3>
              </div>
              <p className="text-muted-foreground">
                We don't teach you how to trade Bitcoin, we show you how to earn Bitcoin.
                Using our Merchant Platform, you can easily Accept Bitcoin for your Goods & Service.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>You already have the skills & products</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>POS & Crowdfunding Pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>Affordable rates with a 30-day free trial, running till 31st of December 2025</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>Addition to BTCMaps for global visibility</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1 bg-primary text-[8px] font-bold text-black transform rotate-45 translate-x-4 -translate-y-2 w-20 text-center">ALPHA</div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Profit Share Model</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Join TimeForce and earn by onboarding merchants to the network.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-background/50 border border-border/50">
                    <span className="text-xs font-mono">0-10 MERCHANTS</span>
                    <span className="font-bold text-primary">30% SHARE</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-background/50 border border-border/50">
                    <span className="text-xs font-mono">11-20 MERCHANTS</span>
                    <span className="font-bold text-primary">40% SHARE</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-primary/10 border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.1)]">
                    <span className="text-xs font-mono font-bold">20+ MERCHANTS</span>
                    <span className="font-bold text-primary">50% SHARE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join TimeForce Section (Moved Here) */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                SQUAD_RECRUITMENT_OPEN
              </div>
              <h2 className="text-4xl font-bold">
                Ready to Join <span className="text-primary">TimeForce</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Whether you're a Merchant ready to accept Bitcoin or a pioneer ready to expand the network, the TimeForce starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20" onClick={() => setIsJoinModalOpen(true)}>
                  Access Registration Form
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg backdrop-blur-sm" asChild>
                  <a href="https://btcpay870642.lndyn.com/register" target="_blank" rel="noopener noreferrer">
                    Direct Server Link
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-8">
                &gt; Secure_Channel: Active | Trial_Period: Valid_Until_DEC_31
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-6 py-16 opacity-80 hover:opacity-100 transition-opacity">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 italic">
              <span className="text-primary">&gt;</span> Further Intel
            </h2>
            <p className="text-muted-foreground font-mono uppercase text-xs tracking-[0.2em]">
              Knowledge is proof of work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card/50 border border-border rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold font-mono tracking-tight">OPEN_SOURCE_BOOKS</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex flex-col gap-2">
                  <span className="text-sm font-medium">The Bitcoin Whitepaper</span>
                  <Button variant="outline" size="sm" className="w-fit gap-2 border-primary/20 text-xs" asChild>
                    <a href="https://exonumia.africa/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" /> READ_HANDBOOK
                    </a>
                  </Button>
                </li>
                <li className="flex flex-col gap-2">
                  <span className="text-sm font-medium italic overflow-hidden whitespace-nowrap text-ellipsis">"The Simplest Bitcoin Book Ever Written"</span>
                  <Button variant="outline" size="sm" className="w-fit gap-2 border-primary/20 text-xs" asChild>
                    <a href="https://thesimplestbitcoinbook.net/#Free-Download" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" /> ACQUIRE_KNOWLEDGE
                    </a>
                  </Button>
                </li>
              </ul>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold font-mono tracking-tight">ENCRYPTED_INTEL</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Lightning Network Analysis</span>
                  <Button variant="outline" size="sm" className="w-fit gap-2 border-primary/20 text-xs" asChild>
                    <a href="https://www.lynalden.com/lightning-network/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" /> DECRYPT_DATA
                    </a>
                  </Button>
                </li>
                <li className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Saylor Academy Curriculum</span>
                  <Button variant="outline" size="sm" className="w-fit gap-2 border-primary/20 text-xs" asChild>
                    <a href="https://learn.saylor.org/course/view.php?id=468" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" /> ENROLL_SYSTEM
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            TimeForce Protocol v1.0.4 | © 2025 EasySats
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TimeForce;
