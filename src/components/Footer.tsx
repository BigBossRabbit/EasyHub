import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github, Terminal, TrendingUp, Activity, Zap, Clock, Eye } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { useBitcoinNetworkStats } from "@/hooks/useBitcoinNetworkStats";
import { usePageVisits } from "@/hooks/usePageVisits";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { rates, loading: priceLoading } = useBitcoinPrice();
    const { stats, loading: statsLoading } = useBitcoinNetworkStats();
    const { visits, loading: visitsLoading } = usePageVisits();

    const moscowTime = rates.nad ? Math.floor(100000000 / rates.nad) : null;
    const formattedMoscowTime = moscowTime
        ? moscowTime < 100
            ? `00:${moscowTime}`
            : moscowTime < 1000
                ? `0${Math.floor(moscowTime / 100)}:${moscowTime % 100}`
                : `${Math.floor(moscowTime / 100)}:${moscowTime % 100}`
        : null;
    const loading = priceLoading || statsLoading;

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

            {/* Bitcoin Price Ticker */}
            {/* Bitcoin Price Ticker */}
            <div className="bg-primary/10 border-b border-primary/30 py-2 overflow-x-auto overflow-y-hidden relative" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex items-center gap-6 animate-marquee whitespace-nowrap min-w-max">
                    {/* Block Height - Links to Mempool */}
                    <a
                        href="https://mempool.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Activity className="h-4 w-4" />
                        <span className="font-bold">BLOCK HEIGHT:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : stats.blockHeight ? stats.blockHeight.toLocaleString() : '[N/A]'}
                        </span>
                    </a>

                    {/* Fees - Links to Mempool */}
                    <a
                        href="https://mempool.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Zap className="h-4 w-4" />
                        <span className="font-bold">AVG FEES:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '[N/A]'}
                        </span>
                    </a>

                    {/* Price USD - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">BTC/USD:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : rates.usd ? `$${rates.usd.toLocaleString()}` : '[N/A]'}
                        </span>
                    </Link>

                    {/* Price NAD - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">BTC/NAD:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : rates.nad ? `N$${rates.nad.toLocaleString()}` : '[N/A]'}
                        </span>
                    </Link>

                    {/* Moscow Time - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Clock className="h-4 w-4" />
                        <span className="font-bold">MOSCOW TIME (NAD):</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : formattedMoscowTime || '[N/A]'}
                        </span>
                    </Link>

                    {/* Page Visits */}
                    <div className="flex items-center gap-2 text-primary text-sm px-4">
                        <Eye className="h-4 w-4" />
                        <span className="font-bold">PAGE VISITS:</span>
                        <span className="text-green-400">
                            {visitsLoading ? '[LOADING...]' : visits.toLocaleString()}
                        </span>
                    </div>

                    {/* Duplicate for seamless loop */}
                    {/* Block Height - Links to Mempool */}
                    <a
                        href="https://mempool.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Activity className="h-4 w-4" />
                        <span className="font-bold">BLOCK HEIGHT:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : stats.blockHeight ? stats.blockHeight.toLocaleString() : '[N/A]'}
                        </span>
                    </a>

                    {/* Fees - Links to Mempool */}
                    <a
                        href="https://mempool.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Zap className="h-4 w-4" />
                        <span className="font-bold">AVG FEES:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '[N/A]'}
                        </span>
                    </a>

                    {/* Price USD - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">BTC/USD:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : rates.usd ? `$${rates.usd.toLocaleString()}` : '[N/A]'}
                        </span>
                    </Link>

                    {/* Price NAD - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-bold">BTC/NAD:</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : rates.nad ? `N$${rates.nad.toLocaleString()}` : '[N/A]'}
                        </span>
                    </Link>

                    {/* Moscow Time - Links to Dashboard */}
                    <Link
                        to="/easystats"
                        className="flex items-center gap-2 text-primary text-sm px-4 hover:text-green-400 transition-colors"
                    >
                        <Clock className="h-4 w-4" />
                        <span className="font-bold">MOSCOW TIME (NAD):</span>
                        <span className="text-green-400">
                            {loading ? '[LOADING...]' : formattedMoscowTime || '[N/A]'}
                        </span>
                    </Link>

                    {/* Page Visits */}
                    <div className="flex items-center gap-2 text-primary text-sm px-4">
                        <Eye className="h-4 w-4" />
                        <span className="font-bold">PAGE VISITS:</span>
                        <span className="text-green-400">
                            {visitsLoading ? '[LOADING...]' : visits.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-primary text-xl">{'>'}</span>
                            <img src="/easysats-logo.png" alt="EasySats" className="h-8 w-8" />
                            <span className="text-xl font-bold">
                                <span className="text-primary">easy</span>
                                <span className="text-green-400">sats</span>
                                <span className="text-primary animate-pulse">_</span>
                            </span>
                        </div>
                        <p className="text-green-400/80 mb-6 max-w-sm text-sm">
                            {'> '} Namibia's First Bitcoin Revolution. Making Bitcoin easy, accessible, and unstoppable for everyone.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com/easysats_" target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com/easysats" target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/easysats/" target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://www.github.com/bigbossrabbit" target="_blank" rel="noopener noreferrer" className="text-green-400/60 hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">{'> '}EXPLORE</h3>
                        <ul className="space-y-2 text-sm text-green-400/80">
                            <li><Link to="/" className="hover:text-primary transition-colors">{'> '}home</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">{'> '}about</Link></li>
                            <li><Link to="/connect" className="hover:text-primary transition-colors">{'> '}connect</Link></li>
                            <li><Link to="/easyjobs" className="hover:text-primary transition-colors">{'> '}easyjobs</Link></li>
                            <li><Link to="/easydevs" className="hover:text-primary transition-colors">{'> '}easydevs</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">{'> '}contact us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">{'> '}LEGAL & RESOURCES</h3>
                        <ul className="space-y-2 text-sm text-green-400/80">
                            <li><Link to="/terms" className="hover:text-primary transition-colors">{'> '}terms & conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">{'> '}privacy policy</Link></li>
                            <li>
                                <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{'> '}white paper</a>
                            </li>
                            <li>
                                <a href="https://www.bon.com.na/CMSTemplates/Bon/Files/bon.com.na/90/90d8c518-f9a2-4e6d-98a4-b192c1a93253.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{'> '}Namibian Virtual Assets Act</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-400/80">
                    <p>{'> '}© {currentYear} OKIN.EnT. All rights reserved.</p>
                    <p>{'> '}Built with ⚡️ by <Link to="/easydevs" className="hover:text-primary transition-colors">EasyDevs</Link></p>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </footer >
    );
};

export default Footer;
