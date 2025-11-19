import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ConnectExplore = () => {
    return (
        <div className="min-h-screen text-foreground">
            <Seo title="Connect & Explore" description="Explore OKIN's projects, platforms, and educational resources in the Bitcoin ecosystem." />

            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
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
                            <Link to="/install" className="text-muted-foreground hover:text-primary transition-colors">~/install</Link>
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
                                        <Link to="/install" className="text-lg font-semibold hover:text-primary transition-colors">~/install</Link>
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
                                        Support the EasySats mission on Geyser Fund. Help us bring Bitcoin education and accessibility to all Namibians.
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
                                        Bitcoin education and sovereignty resources. Learn how to take control of your financial future with self-custody solutions.
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
