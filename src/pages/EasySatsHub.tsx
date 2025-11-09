import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const EasySatsHub = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="EasySats Chronicle" description="Namibia's First Bitcoin Revolution: Easy, Accessible & Unstoppable" />
      <header className="border-b-4 border-primary bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1 bg-primary"></div>
              <img src="easysats-logo.png" alt="EasySats" className="h-12 w-12" />
              <div className="h-px flex-1 bg-primary"></div>
            </div>
            <h1 className="text-5xl font-serif font-bold tracking-wider">
              THE EASYSATS CHRONICLE
            </h1>
            <p className="text-sm text-muted-foreground tracking-widest">
              BUILDING TOMORROW, TODAY • EST. BLOCKHEIGHT 736,253 • NAMIBIA
            </p>
          </div>
          <nav className="flex justify-center gap-8 mt-6 text-sm font-serif border-t border-b border-border py-3">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wide">About</a>
            <Link to="/jobs" className="hover:text-primary transition-colors uppercase tracking-wide">Jobs</Link>
            <Link to="/timeforce" className="hover:text-primary transition-colors uppercase tracking-wide">TimeForce</Link>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-wide">TPOK</a>
            <Link to="/freedomtech" className="hover:text-primary transition-colors uppercase tracking-wide">FreedomTech</Link>
            <Link to="/install" className="hover:text-primary transition-colors uppercase tracking-wide">Install PWA</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-2">Featured Story</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                Namibia's First Bitcoin Revolution: Easy, Accessible & Unstoppable
              </h2>
            </div>

            <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed font-serif space-y-4">
              <p className="text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2">
                At EasySats, it is our mission to find ways that allow users to easily purchase Bitcoin,
                while using our accumulated expertise & technical knowledge to ensure that not only can
                people purchase it, but they are made aware of how they can earn & accept it for their goods &
                services as well as securely store it themselves.
              </p>

              <p>
                We are accessible to people of all income levels, to purposefully be inclusive of those
                who are always excluded. Anyone can earn, purchase, accept & store Bitcoin using tailored
                solutions from us, regardless of their financial status or level of experience.
              </p>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="font-serif">Read Full Story</Button>
              <Button size="lg" variant="outline" className="font-serif" asChild>
                <Link to="/timeforce">Join TimeForce</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-serif" asChild>
                <Link to="/jobs">Earn Bitcoin</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-serif" asChild>
                <Link to="/freedomtech">Build the Future</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border-2 border-border p-6">
              <h3 className="text-xl font-serif font-bold mb-4 border-b border-border pb-2">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>First Bitcoin voucher system in Namibia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>Instant payment confirmation via Lightning Network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">■</span>
                  <span>No bank account or permission required</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary p-6">
              <Newspaper className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-serif font-bold mb-2">Latest Edition</h3>
              <p className="text-sm text-muted-foreground">Subscribe to receive Bitcoin education & updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EasySatsHub;
