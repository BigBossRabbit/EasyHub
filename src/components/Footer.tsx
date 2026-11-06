import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();
    const col = "text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors";

    return (
        <footer className="mt-24 border-t border-border">
            <div className="container mx-auto px-6 py-16 text-center">
                <p className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl mx-auto">
                    Bitcoin is easier <em>when someone shows you.</em>
                </p>
                <p className="text-muted-foreground mt-4 max-w-md mx-auto text-[0.95rem]">
                    Namibia's first Bitcoin earning layer. Learn it, earn it, keep it.
                </p>

                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12" aria-label="Footer">
                    <Link to="/timeforce" className={col}>TimeForce</Link>
                    <Link to="/easyjobs" className={col}>EasyJobs</Link>
                    <Link to="/easydevs" className={col}>EasyDevs</Link>
                    <Link to="/tpok" className={col}>Learn</Link>
                    <Link to="/altsports" className={col}>AltSports</Link>
                    <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer" className={col}>Whitepaper</a>
                    <Link to="/contact" className={col}>Contact</Link>
                </nav>

                <div className="flex justify-center gap-6 mt-10">
                    <a href="https://x.com/easysats_" target="_blank" rel="noopener noreferrer" aria-label="EasySats on X" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-[18px] w-[18px]" /></a>
                    <a href="https://www.linkedin.com/company/easysats/" target="_blank" rel="noopener noreferrer" aria-label="EasySats on LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-[18px] w-[18px]" /></a>
                    <a href="https://www.github.com/bigbossrabbit" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-[18px] w-[18px]" /></a>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[0.78rem] text-muted-foreground/70">
                    <p>© {year} OKIN Trading Enterprises CC · trading as OKIN Ent. · Windhoek, Namibia</p>
                    <div className="flex gap-6">
                        <a href="https://hub.okinent.org" className="hover:text-primary">The Hub</a>
                        <a href="https://gto.okinent.org" className="hover:text-primary">GTO Labs</a>
                        <Link to="/terms" className="hover:text-primary">Terms</Link>
                        <Link to="/privacy" className="hover:text-primary">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
