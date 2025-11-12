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
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const TimeForce = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="TimeForce — Bitcoin Onboarding Handbook" description="A structured approach to onboarding business owners with Bitcoin solutions." canonical="/timeforce" />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </Link>
            <nav className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm mt-4 md:mt-0">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
              <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
              <Link to="/timeforce" className="text-primary">~/timeforce</Link>
              <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
              <Link to="/install" className="text-muted-foreground hover:text-primary transition-colors">~/install</Link>
            </nav>
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
            <Button size="lg" className="gap-2">
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
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-6 w-6" />
              <span className="text-2xl font-bold">The Problem</span>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Many tend to complicate the easiest parts about Bitcoin when most will come to 
                understand it the easiest by the use cases it solves.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Banking Overreach</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Monthly banking charges for storing your own money</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Additional fees for missed payments, or chargebacks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>No warning or arrangement opportunities</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Security Risks</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Risk of robbery for cash transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Shady bookkeepers & bad actors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
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
            {/* Ease of Usage */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
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

            {/* True Ownership */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
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

            {/* Additional Revenue Stream */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Additional Revenue Stream</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Accepting Bitcoin opens doors to new customers & revenue opportunities 
                beyond traditional payment methods.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Serve customers without Namibian Dollars</span>
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
      <section className="container mx-auto px-6 py-16 bg-card">
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
                  <span>Affordable rates with 1st Month completely free</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>Addition to BTCMaps for global visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-1" />
                  <span>and many additional features</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/10 border border-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">TimeForce Onboarding Profit Share</h3>
              <div className="space-y-4">
              <p className="text-muted-foreground">
                For those interested in joining the TimeForce & what that means for your ability to earn.
                Sign-up a Sub-vendor & earn your percentage of their Subscription.
              </p>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-sm">0-10 Sub-vendors</span>
                  <span className="font-semibold text-primary text-right">70% EasySats / 30% You</span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-sm">11-20 Sub-vendors</span>
                  <span className="font-semibold text-primary text-right">60% EasySats / 40% You</span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-sm">20+ Sub-vendors</span>
                  <span className="font-semibold text-primary text-right">50% EasySats / 50% You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> Additional Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Educational materials to deepen your Bitcoin knowledge
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Open-Source Books</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span>The Bitcoin Whitepaper - In various Languages</span>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://exonumia.africa/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Read
                    </a>
                  </Button>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span>The Simplest Bitcoin Book Ever Written - by Knut Svanholm</span>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://thesimplestbitcoinbook.net/#Free-Download" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Read
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Education & Articles</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span>A Look at the Lightning Network - by Lyn Alden</span>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://www.lynalden.com/lightning-network/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Read
                    </a>
                  </Button>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span>The Saylor Academy - Bitcoin for Everybody</span>
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://learn.saylor.org/course/view.php?id=468" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      Enroll
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Vendor Signup Section */}
      <section className="container mx-auto px-6 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary">&gt;</span> Join TimeForce
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to become a Sub-Vendor, or to sign them up & become part of the TimeForce? 
            </p>
            <p className="text-xl text-muted-foreground">
              Sign up directly through our platform below.
            </p>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-8">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">EasySats Integrations</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Register for EasySats Server access - Building Tomorrow, Today!
              </p>
            </div>
            
            <div className="w-full">
              <div className="text-center p-8 bg-background border border-border rounded-lg">
                <div className="mb-6">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">EasySats Server Registration</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Register for secure, private & censorship-resistant Bitcoin payment processing. 
                    Click below to access our registration form.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="https://easysats.okinent.org/register" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Register for EasySats Server access
                  </a>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">What you'll get:</p>
                    <ul className="space-y-1 text-left max-w-sm mx-auto">
                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Censorship-resistant payments
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Completely free to use - for the 1st Month
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Secure & private transactions - Self-custodial setup
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Having trouble with the form? 
                <a 
                  href="https://easysats.okinent.org/register" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Open in new tab
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimeForce;
