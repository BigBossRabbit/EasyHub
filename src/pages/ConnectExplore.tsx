import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Menu, Rocket } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CONNECT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "OKIN Projects & Platforms",
  "description": "Platforms and projects empowering Bitcoin adoption in Namibia.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "EasySats Merchant Platform",
      "url": "https://easysats.okinent.org/register?returnurl=%2F"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "EasySats Crowdfunding",
      "url": "https://geyser.fund/project/easysats"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "SovereignKey",
      "url": "https://sovereignkey.carrd.co/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Trezor Academy Sessions",
      "url": "https://www.youtube.com/watch?v=w3hnFCfCo84"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Vexlaks",
      "url": "https://vexlaks.com/"
    }
  ]
});

const ConnectExplore = () => {
    return (
        <div className="min-h-screen text-foreground">
            <Seo 
                title="Connect & Explore" 
                description="Explore OKIN's projects, platforms, and educational resources in the Bitcoin ecosystem."
                schema={CONNECT_SCHEMA}
            />

            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-primary" />
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
                            <Link to="/connect" className="text-primary">~/connect</Link>
                            <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
                            <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
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

            <div className="container mx-auto px-6 py-12">

                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-serif font-bold mb-4">Connect & Explore</h1>
                        <p className="text-xl text-muted-foreground">
                            Discover our platforms, projects, and resources empowering Bitcoin adoption in Namibia
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* EasySats Merchant Platform */}
                        <a href="https://easysats.okinent.org/register?returnurl=%2F" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="pt-8 pb-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="font-bold text-2xl text-primary">EasySats Merchant Platform</h2>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Bitcoin payment solutions for merchants in Namibia. Accept Bitcoin payments seamlessly and join the financial revolution.
                                    </p>
                                </CardContent>
                            </Card>
                        </a>

                        {/* EasySats Crowdfunding */}
                        <a href="https://geyser.fund/project/easysats" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="pt-8 pb-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="font-bold text-2xl text-primary">EasySats Crowdfunding</h2>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Support the EasySats mission on Geyser Fund to help us bring Bitcoin education and accessibility to all Namibians.
                                    </p>
                                </CardContent>
                            </Card>
                        </a>

                        {/* SovereignKey */}
                        <a href="https://sovereignkey.carrd.co/" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="pt-8 pb-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="font-bold text-2xl text-primary">SovereignKey</h2>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Bitcoin education and sovereignty resources. Learn how to take control of your financial future with a self-custodial "Swiss-Army Knife solution.
                                    </p>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Trezor Academy */}
                        <a href="https://www.youtube.com/watch?v=w3hnFCfCo84" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="pt-8 pb-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="font-bold text-2xl text-primary">Trezor Academy Sessions</h2>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Educational sessions on Bitcoin security and hardware wallets. Master the fundamentals of keeping your Bitcoin safe.
                                    </p>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Vexlaks */}
                        <a href="https://vexlaks.com/" target="_blank" rel="noopener noreferrer" className="group md:col-span-2">
                            <Card className="bg-gradient-to-br from-card/80 to-primary/10 border-primary/30 hover:border-primary/60 transition-all duration-300 h-full hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Rocket className="h-24 w-24 -rotate-12" />
                                </div>
                                <CardContent className="pt-8 pb-6 relative z-10">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <h2 className="font-bold text-2xl text-primary">Vexlaks Digital Solutions</h2>
                                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono border border-primary/30">PARTNER</span>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                        Your partner in digital transformation. Vexlaks offers cutting-edge web development, mobile apps, and digital marketing to help businesses thrive in the digital age. Innovate. Create. Transform.
                                    </p>
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        <span className="text-xs font-mono text-primary/80 bg-background/50 px-2 py-1 rounded border border-primary/10">Web Dev</span>
                                        <span className="text-xs font-mono text-primary/80 bg-background/50 px-2 py-1 rounded border border-primary/10">Mobile Apps</span>
                                        <span className="text-xs font-mono text-primary/80 bg-background/50 px-2 py-1 rounded border border-primary/10">UI/UX</span>
                                        <span className="text-xs font-mono text-primary/80 bg-background/50 px-2 py-1 rounded border border-primary/10">Digital Marketing</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </div>

                    <div className="mt-12 p-8 bg-card/30 rounded-2xl border border-primary/20">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-serif font-bold mb-4">Join our WhatsApp Community</h3>
                                <p className="text-muted-foreground mb-6">
                                    Connect with other Bitcoiners in Namibia. Get updates, ask questions, and be part of the conversation in our dedicated WhatsApp community.
                                </p>
                                <Button asChild variant="default" className="w-full md:w-auto">
                                    <a href="https://chat.whatsapp.com/GE18aVdTwT2BwJyzR2zl3F" target="_blank" rel="noopener noreferrer">
                                        Join Community
                                    </a>
                                </Button>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="bg-white p-4 rounded-xl shadow-lg">
                                    <img
                                        src="/assets/whatsapp-qr.png"
                                        alt="WhatsApp Community QR Code"
                                        className="w-48 h-48 object-contain"
                                        loading="lazy"
                                        width="192"
                                        height="192"
                                    />
                                </div>
                                <p className="text-xs text-center mt-2 text-muted-foreground">Scan to join</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-card/30 rounded-2xl border border-primary/20">
                        <h3 className="text-2xl font-serif font-bold mb-4 text-center">Want to Get Involved?</h3>
                        <p className="text-center text-muted-foreground mb-6">
                            Join us in building a Bitcoin-powered future for Namibia. Whether you're a merchant, educator, or enthusiast, there's a place for you in our community.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button asChild variant="default">
                                <Link to="/about">Learn More About Us</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <a href="https://geyser.fund/project/easysats" target="_blank" rel="noopener noreferrer">
                                    Support Our Mission
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectExplore;
