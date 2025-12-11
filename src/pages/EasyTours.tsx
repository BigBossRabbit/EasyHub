import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Bitcoin, ArrowRight, Menu, Globe, Camera, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const EasyTours = () => {
    const tours = [
        {
            id: 1,
            title: "Dunes & Sats Expedition",
            duration: "3 Days",
            location: "Sossusvlei, Namib Desert",
            price: "0.015 BTC",
            description: "Climb Big Daddy, walk through the haunting Deadvlei, and sleep under a blanket of stars in the world's oldest desert. Luxury camping included.",
            image: "/assets/namibia-hero.png", // Reusing the hero for now, or a placeholder if I had one
            features: ["Guided Dune Walk", "Luxury Camping", "All Meals Included", "Starlink Access"]
        },
        {
            id: 2,
            title: "Skeleton Coast Crypto Retreat",
            duration: "5 Days",
            location: "Skeleton Coast",
            price: "0.025 BTC",
            description: "Escape to one of the most remote places on earth. Perfect for deep work or complete disconnection. Experience the raw power of the Atlantic meeting the desert.",
            image: "/assets/namibia-hero.png",
            features: ["Private Chalet", "Shipwreck Tour", "Desert Elephant Tracking", "Secure Workspace"]
        },
        {
            id: 3,
            title: "Windhoek City Bitcoin Walk",
            duration: "1 Day",
            location: "Windhoek",
            price: "0.001 BTC",
            description: "Discover the capital's hidden gems. Visit historical sites, meet local Bitcoiners, and shop at merchants who accept Lightning payments.",
            image: "/assets/namibia-hero.png",
            features: ["Historical Tour", "Merchant Visits", "Local Cuisine Lunch", "Bitcoin Meetup"]
        }
    ];

    return (
        <div className="min-h-screen text-foreground bg-background">
            <Seo title="EasyTours — Experience Namibia with Bitcoin" description="Authentic Namibian tours and experiences, payable entirely in Bitcoin." canonical="/easytours" />

            {/* Navigation - Consistent with other pages */}
            <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10 group-hover:scale-110 transition-transform" />
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-primary" />
                                <span className="text-xl font-bold">
                                    <span className="text-primary">easy</span>
                                    <span className="text-foreground">tours</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
                            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">~/about</Link>
                            <Link to="/connect" className="text-muted-foreground hover:text-primary transition-colors">~/connect</Link>
                            <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
                            <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
                            <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
                            <Link to="/easytours" className="text-primary">~/easytours</Link>
                            <Link to="/tpok" className="text-muted-foreground hover:text-primary transition-colors">~/tpok</Link>
                        </nav>

                        {/* Mobile Navigation */}
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

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/namibia-hero.png"
                        alt="Namibian Desert"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-background/90" />
                </div>

                <div className="container relative z-10 px-6 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm text-primary animate-fade-in-up">
                        <Bitcoin className="h-4 w-4" />
                        <span className="text-sm font-semibold">Namibia's Premier Bitcoin Travel Experience</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg animate-fade-in-up delay-100">
                        Discover Namibia <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            Paid in Bitcoin
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up delay-200">
                        From the red dunes of the Namib to the Skeleton Coast.
                        Experience authentic adventures without touching fiat.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-300">
                        <Button size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground">
                            Explore Tours
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm">
                            How it Works
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Bitcoin className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Bitcoin First</h3>
                            <p className="text-muted-foreground">
                                Pay for everything in Sats. Accommodation, transport, and activities. No banks, no exchange fees, just peer-to-peer value.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sun className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
                            <p className="text-muted-foreground">
                                Curated by locals who know the land. We take you off the beaten path to experience the true spirit of Namibia.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Community Focused</h3>
                            <p className="text-muted-foreground">
                                Connect with the local Bitcoin community. Visit circular economy hubs and meet the people building the future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="py-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Curated Adventures</h2>
                    <p className="text-muted-foreground text-lg">Select your journey. All prices in Bitcoin.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                        <div key={tour.id} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-mono border border-white/20">
                                    {tour.duration}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-primary text-sm mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>{tour.location}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{tour.title}</h3>
                                <p className="text-muted-foreground mb-6 flex-1">{tour.description}</p>

                                <div className="space-y-3 mb-6">
                                    {tour.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">Starting from</span>
                                        <span className="text-xl font-bold font-mono text-primary">{tour.price}</span>
                                    </div>
                                    <Button className="gap-2 group-hover:translate-x-1 transition-transform">
                                        Book Now <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/5 border-y border-primary/10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready for the Adventure of a Lifetime?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Whether you're a solo bitcoiner, a family, or a corporate retreat, we can tailor the perfect Namibian experience for you.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg" asChild>
                        <Link to="/contact">
                            Contact Us to Plan Your Trip
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default EasyTours;
