import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
    { name: "Earn", path: "/timeforce" },
    { name: "Jobs", path: "/easyjobs" },
    { name: "Build", path: "/easydevs" },
    { name: "Learn", path: "/tpok" },
    { name: "About", path: "/about" },
];

const Navbar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path || location.pathname === path + "/";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="container mx-auto px-6 h-[64px] flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group" aria-label="EasySats home">
                    <img src="/easysats-logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px] transition-transform duration-500 group-hover:rotate-[20deg]" />
                    <span className="font-serif text-[1.35rem] font-semibold tracking-wide leading-none">
                        Easy<em className="text-primary italic font-medium">Sats</em>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-7" aria-label="Main">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-[0.78rem] uppercase tracking-[0.14em] transition-colors py-1 ${isActive(link.path)
                                ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-primary"
                                : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="https://hub.okinent.org" className="text-[0.78rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors">Hub</a>
                    <Link to="/connect" className="text-[0.78rem] uppercase tracking-[0.12em] text-primary border border-primary/40 rounded-full px-4 py-[7px] hover:bg-primary/10 transition-colors">
                        Talk to us
                    </Link>
                </nav>

                <div className="flex md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Open menu">
                                <Menu className="h-6 w-6 text-primary" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background border-border">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <nav className="flex flex-col gap-6 pt-14 pl-2">
                                {[{ name: "Home", path: "/" }, ...navLinks].map((link) => (
                                    <Link key={link.path} to={link.path}
                                        className={`font-serif text-3xl transition-colors ${isActive(link.path) ? "text-primary italic" : "text-foreground hover:text-primary"}`}>
                                        {link.name}
                                    </Link>
                                ))}
                                <a href="https://hub.okinent.org" className="font-serif text-3xl text-muted-foreground hover:text-primary">The Hub</a>
                                <Link to="/connect" className="mt-4 self-start text-xs uppercase tracking-[0.14em] text-primary border border-primary/40 rounded-full px-5 py-3">Talk to us</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
