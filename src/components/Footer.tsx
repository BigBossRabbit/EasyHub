import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black/95 border-t-2 border-primary mt-auto relative overflow-hidden font-mono">
            {/* Terminal-style Background Pattern */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                {/* Scanlines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent bg-[length:100%_4px] animate-pulse"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(247, 147, 26, 0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(247, 147, 26, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}></div>

                {/* Animated Corner Brackets */}
                <div className="absolute top-4 left-4 text-primary/40 text-2xl animate-pulse">[</div>
                <div className="absolute top-4 right-4 text-primary/40 text-2xl animate-pulse">]</div>
                <div className="absolute bottom-4 left-4 text-primary/40 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>[</div>
                <div className="absolute bottom-4 right-4 text-primary/40 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>]</div>

                {/* Blinking Cursor Elements */}
                <div className="absolute top-1/4 left-1/3 w-2 h-4 bg-primary/60 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-4 bg-primary/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-4 bg-primary/60 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-primary text-xl">{'>'}</span>
                            <img src="/easysats-logo.png" alt="EasySats" className="h-8 w-8" />
                            <span className="text-xl font-bold">
                                <span className="text-primary">easy</span>
                                <span className="text-foreground">sats</span>
                                <span className="text-primary animate-pulse">_</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                            {'> '} Namibia's First Bitcoin Revolution. Making Bitcoin easy, accessible, and unstoppable for everyone.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com/easysats_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>

                            <a href="https://www.linkedin.com/company/easysats/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://www.github.com/bigbossrabbit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">{'> '}EXPLORE</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">{'> '}home</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">{'> '}about</Link></li>
                            <li><Link to="/connect" className="hover:text-primary transition-colors">{'> '}connect</Link></li>
                            <li><Link to="/easyjobs" className="hover:text-primary transition-colors">{'> '}easyjobs</Link></li>
                            <li><Link to="/easydevs" className="hover:text-primary transition-colors">{'> '}easydevs</Link></li>
                            <li><Link to="/insights" className="hover:text-primary transition-colors">{'> '}insights</Link></li>
                            <li><Link to="/altsports" className="hover:text-primary transition-colors">{'> '}altsports</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">{'> '}LEGAL & RESOURCES</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/terms" className="hover:text-primary transition-colors">{'> '}terms & conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">{'> '}privacy policy</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">{'> '}contact us</Link></li>
                            <li>
                                <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{'> '}white paper</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>{'> '}© {currentYear} OKIN.EnT. All rights reserved.</p>
                    <p>{'> '}Built with ⚡️ by <Link to="/easydevs" className="hover:text-primary transition-colors">EasyDevs</Link></p>
                </div>
            </div>

        </footer >
    );
};

export default Footer;
