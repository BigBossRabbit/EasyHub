import { Link } from "react-router-dom";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { useBitcoinNetworkStats } from "@/hooks/useBitcoinNetworkStats";
import { usePageVisits } from "@/hooks/usePageVisits";

const Ticker = () => {
    const { rates, loading: priceLoading } = useBitcoinPrice();
    const { stats, loading: statsLoading } = useBitcoinNetworkStats();
    const { visits, loading: visitsLoading } = usePageVisits();

    // sats you get for N$1 (100,000,000 sats per BTC / BTC price in NAD)
    const satsPerNad = rates.nad ? Math.floor(100000000 / rates.nad) : null;
    const formattedSatsPerNad = satsPerNad ? satsPerNad.toLocaleString() : null;
    const loading = false; // per-value dashes below; never show [LOADING...]

    return (
        <div className="fixed top-[64px] left-0 right-0 z-40 bg-background/90 backdrop-blur-md font-mono border-b border-border py-2 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap min-w-max">
                {/* Block Height - Links to Mempool */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BLOCK HEIGHT:</span>
                    <span className="text-foreground normal-case tracking-normal">{stats.blockHeight ? stats.blockHeight.toLocaleString() : '—'}</span>
                </a>
                {/* Fees - Links to Mempool */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>AVG FEES:</span>
                    <span className="text-foreground normal-case tracking-normal">{stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '—'}</span>
                </a>
                {/* Price USD */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BTC/USD:</span>
                    <span className="text-foreground normal-case tracking-normal">{rates.usd ? `$${Math.round(rates.usd).toLocaleString()}` : '—'}</span>
                </Link>
                {/* Price NAD */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BTC/NAD:</span>
                    <span className="text-foreground normal-case tracking-normal">{rates.nad ? `N$${Math.round(rates.nad).toLocaleString()}` : '—'}</span>
                </Link>
                {/* Sats per N$1 */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>SATS PER N$1:</span>
                    <span className="text-foreground normal-case tracking-normal">{formattedSatsPerNad || '—'}</span>
                </Link>

                {/* Duplicate for seamless loop */}
                {/* Block Height */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BLOCK HEIGHT:</span>
                    <span className="text-foreground normal-case tracking-normal">{stats.blockHeight ? stats.blockHeight.toLocaleString() : '—'}</span>
                </a>
                {/* Fees */}
                <a href="https://mempool.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>AVG FEES:</span>
                    <span className="text-foreground normal-case tracking-normal">{stats.fees ? `~${stats.fees.halfHourFee} sat/vB` : '—'}</span>
                </a>
                {/* Price USD */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BTC/USD:</span>
                    <span className="text-foreground normal-case tracking-normal">{rates.usd ? `$${Math.round(rates.usd).toLocaleString()}` : '—'}</span>
                </Link>
                {/* Price NAD */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>BTC/NAD:</span>
                    <span className="text-foreground normal-case tracking-normal">{rates.nad ? `N$${Math.round(rates.nad).toLocaleString()}` : '—'}</span>
                </Link>
                {/* Sats per N$1 */}
                <Link to="/easystats" className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground px-5 hover:text-primary transition-colors">
                    <span>SATS PER N$1:</span>
                    <span className="text-foreground normal-case tracking-normal">{formattedSatsPerNad || '—'}</span>
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
