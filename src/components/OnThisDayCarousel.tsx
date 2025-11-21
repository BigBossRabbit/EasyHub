import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalData {
    year: number;
    price: number;
    loading: boolean;
    error: boolean;
}

interface OnThisDayCarouselProps {
    currency: 'USD' | 'NAD';
    currentPrice: number | null;
}

const OnThisDayCarousel = ({ currency, currentPrice }: OnThisDayCarouselProps) => {
    const [historyData, setHistoryData] = useState<HistoricalData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const vsCurrency = currency === 'USD' ? 'usd' : 'zar';
                // Fetch full history (daily data)
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vsCurrency}&days=max&interval=daily`);
                if (!response.ok) throw new Error('Failed fetch');
                const data = await response.json();
                const prices = data.prices; // Array of [timestamp, price]

                const today = new Date();
                const targetMonth = today.getMonth();
                const targetDate = today.getDate();

                const results: HistoricalData[] = [];
                const yearsBack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

                yearsBack.forEach(yearOffset => {
                    const targetYear = today.getFullYear() - yearOffset;

                    // Find the closest data point to this date
                    // Since data is daily, we look for a timestamp that matches the date
                    const foundPoint = prices.find((p: number[]) => {
                        const d = new Date(p[0]);
                        return d.getFullYear() === targetYear && d.getMonth() === targetMonth && d.getDate() === targetDate;
                    });

                    if (foundPoint) {
                        results.push({
                            year: targetYear,
                            price: foundPoint[1],
                            loading: false,
                            error: false
                        });
                    }
                });

                setHistoryData(results.sort((a, b) => b.year - a.year)); // Most recent first
            } catch (e) {
                console.error('Error fetching history', e);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [currency]);

    useEffect(() => {
        if (historyData.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % historyData.length);
        }, 21000); // 21 seconds

        return () => clearInterval(interval);
    }, [historyData]);

    if (loading) {
        return (
            <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[160px] flex items-center justify-center">
                <div className="text-primary animate-pulse">LOADING HISTORY...</div>
            </div>
        );
    }

    if (historyData.length === 0) {
        return (
            <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[160px] flex items-center justify-center">
                <div className="text-green-400/60">HISTORY DATA UNAVAILABLE</div>
            </div>
        );
    }

    const item = historyData[currentIndex];
    const roi = currentPrice && item.price ? ((currentPrice - item.price) / item.price) * 100 : 0;

    return (
        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

            {/* Progress Bar for 21s timer */}
            <div className="absolute top-0 left-0 h-1 bg-primary/30 w-full">
                <div
                    key={currentIndex} // Reset animation on change
                    className="h-full bg-primary animate-[progress_21s_linear]"
                ></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mt-2">
                <div className="p-4 bg-primary/10 rounded-full border border-primary/30">
                    <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg font-bold text-white mb-1">ON THIS DAY IN {item.year}</h2>
                    <p className="text-green-400/80 text-sm mb-4">
                        {roi > 0
                            ? "HODLers from this era are now up significantly."
                            : "A rare moment where price was higher."}
                    </p>
                    <div className="text-3xl font-bold text-primary">
                        {currency === 'USD' ? `$${item.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `N$${item.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs text-green-400/60 mb-1">ROI SINCE THEN</div>
                    <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center justify-end gap-2`}>
                        {roi >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-2 right-4 flex gap-1">
                {historyData.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-primary/20'}`}
                    />
                ))}
            </div>

            <style>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default OnThisDayCarousel;
