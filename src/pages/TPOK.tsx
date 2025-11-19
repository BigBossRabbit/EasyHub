import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Construction } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const TPOK = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Seo title="TPOK — Coming Soon" description="TPOK page coming soon." />

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Construction className="h-4 w-4 text-primary" />
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
              <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
              <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
              <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
              <Link to="/tpok" className="text-primary">~/tpok</Link>
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

      <div className="flex flex-col items-center justify-center py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold">Coming Soon</h1>
          <p className="mb-6 text-lg text-muted-foreground">This page is under construction.</p>
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TPOK;
