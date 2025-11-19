import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Seo from "@/components/Seo";

// Type for the PWA install prompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const onInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen text-foreground">
      <Seo
        title="Install Easysats PWA"
        description="Add Easysats to your home screen for a fast, offline-first experience."
        canonical="/install"
      />

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
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
              <Link to="/tpok" className="text-muted-foreground hover:text-primary transition-colors">~/tpok</Link>
              <Link to="/install" className="text-primary">~/install</Link>
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

      <main className="flex min-h-screen items-center justify-center px-6">
        <Seo
          title="Install Easysats PWA"
          description="Add Easysats to your home screen for a fast, offline-first experience."
          canonical="/install"
        />
        <section className="mx-auto w-full max-w-xl text-center">
          <h1 className="mb-3 text-3xl font-semibold">Install Easysats</h1>
          <p className="mb-6 text-muted-foreground">
            Get the app-like experience. Works on iOS and Android. Offline-ready and fast.
          </p>

          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              {installed ? "Installed" : deferredPrompt ? "Ready to install" : "Install prompt not available yet"}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={onInstall} disabled={!deferredPrompt || installed}>
              {installed ? "Installed" : "Install App"}
            </Button>
            <Button variant="secondary" asChild>
              <a href="/" aria-label="Back to Home">Back Home</a>
            </Button>
          </div>

          <div className="mt-10 text-left">
            <h2 className="mb-2 text-xl font-medium">iOS instructions</h2>
            <ol className="list-decimal space-y-1 pl-6 text-sm text-muted-foreground">
              <li>Open this page in Safari.</li>
              <li>Tap the Share icon.</li>
              <li>Select "Add to Home Screen".</li>
            </ol>
            <h2 className="mt-6 mb-2 text-xl font-medium">Android instructions</h2>
            <ol className="list-decimal space-y-1 pl-6 text-sm text-muted-foreground">
              <li>Open this page in Chrome.</li>
              <li>Look for the banner or tap the browser menu.</li>
              <li>Choose "Install app".</li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
