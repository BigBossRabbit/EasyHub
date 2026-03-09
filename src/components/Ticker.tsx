import { Link } from "react-router-dom";
import { TrendingUp, Activity, Zap, Clock, Eye } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { useBitcoinNetworkStats } from "@/hooks/useBitcoinNetworkStats";
import { usePageVisits } from "@/hooks/usePageVisits";

const Ticker = () => {
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
        <div className="fixed top-[73px] left-0 right-0 z-40 bg-black/80 backdrop-blur-md font-mono border-b border-primary/30 py-2 overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap min-w-max">
                {/* Block Height - Links to Mempool */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Activity className="h-4 w-4" />
                    <span className="font-bold">BLOCK HEIGHT:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : stats.blockHeight ? stats.blockHeight.toLocaleString() : '[N/A]'}</span>
                </a>
                {/* Fees - Links to Mempool */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Zap className="h-4 w-4" />
                    <span className="font-bold">AVG FEES:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '[N/A]'}</span>
                </a>
                {/* Price USD */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">BTC/USD:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : rates.usd ? `$${rates.usd.toLocaleString()}` : '[N/A]'}</span>
                </Link>
                {/* Price NAD */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">BTC/NAD:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : rates.nad ? `N$${rates.nad.toLocaleString()}` : '[N/A]'}</span>
                </Link>
                {/* Moscow Time */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">MOSCOW TIME (NAD):</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : formattedMoscowTime || '[N/A]'}</span>
                </Link>

                {/* Duplicate for seamless loop */}
                {/* Block Height */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Activity className="h-4 w-4" />
                    <span className="font-bold">BLOCK HEIGHT:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : stats.blockHeight ? stats.blockHeight.toLocaleString() : '[N/A]'}</span>
                </a>
                {/* Fees */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Zap className="h-4 w-4" />
                    <span className="font-bold">AVG FEES:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '[N/A]'}</span>
                </a>
                {/* Price USD */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">BTC/USD:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : rates.usd ? `$${rates.usd.toLocaleString()}` : '[N/A]'}</span>
                </Link>
                {/* Price NAD */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold">BTC/NAD:</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : rates.nad ? `N$${rates.nad.toLocaleString()}` : '[N/A]'}</span>
                </Link>
                {/* Moscow Time */}
                <Link to="/easystats" className="flex items-center gap-2 text-primary text-sm px-4 hover:text-foreground transition-colors">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">MOSCOW TIME (NAD):</span>
                    <span className="text-foreground">{loading ? '[LOADING...]' : formattedMoscowTime || '[N/A]'}</span>
                </Link>
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
        </div>
    );
};

export default Ticker;
