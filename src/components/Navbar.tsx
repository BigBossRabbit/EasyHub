import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Globe, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
        { name: "connect", path: "/connect" },
        { name: "easydevs", path: "/easydevs" },
        { name: "easyjobs", path: "/easyjobs" },
        { name: "timeforce", path: "/timeforce" },
        { name: "tpok", path: "/tpok" },
        { name: "chronicle", path: "/insights" },
        { name: "altsports", path: "/altsports" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/easysats-logo.png" alt="EasySats" width={40} height={40} className="h-10 w-10 group-hover:scale-110 transition-transform" />
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-primary">easy</span>
                                <span className="text-foreground">sats</span>
                                <span className="text-secondary animate-pulse">_</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center justify-center gap-1 text-sm font-medium flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-full transition-all hover:bg-white/5 ${isActive(link.path)
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <span className="opacity-50">~/</span>{link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Navigation (Hamburger Menu) */}
                    <div className="flex md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Open menu">
                                    <Menu className="h-6 w-6 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-black border-white/10">
                                <nav className="flex flex-col gap-4 pt-12">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`text-lg font-semibold transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground"
                                                }`}
                                        >
                                            ~/ {link.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
