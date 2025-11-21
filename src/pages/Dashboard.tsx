import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Activity, Zap, DollarSign, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Seo from '@/components/Seo';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { Button } from '@/components/ui/button';
import OnThisDayCarousel from '@/components/OnThisDayCarousel';

const Dashboard = () => {
    const [currency, setCurrency] = useState<'USD' | 'NAD'>('USD');
    const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
    const [chartData, setChartData] = useState<any[]>([]);
    const { rates, loading: priceLoading } = useBitcoinPrice();
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [chartLoading, setChartLoading] = useState(true);

    // Fetch Chart Data from CoinGecko
    useEffect(() => {
        const fetchChartData = async () => {
            setChartLoading(true);
            try {
                let days = '1';
                if (timeframe === '7D') days = '7';
                if (timeframe === '30D') days = '30';

                const vsCurrency = currency === 'USD' ? 'usd' : 'zar'; // ZAR as NAD proxy
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vsCurrency}&days=${days}`);
                if (!response.ok) throw new Error('Failed to fetch chart data');

                const data = await response.json();
                let prices = data.prices;

                // Filter for 1H if selected (since API min is 1 day)
                if (timeframe === '1H') {
                    const oneHourAgo = Date.now() - 3600000;
                    prices = prices.filter((p: any[]) => p[0] >= oneHourAgo);
                }

                const formattedData = prices.map((item: any[]) => {
                    const date = new Date(item[0]);
                    let dateLabel = '';

                    if (timeframe === '1H' || timeframe === '24H') {
                        dateLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    } else {
                        dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }

                    return {
                        date: dateLabel,
                        price: item[1],
                        timestamp: item[0]
                    };
                });

                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            } finally {
                setChartLoading(false);
            }
        };

        fetchChartData();
    }, [currency, timeframe]);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setIsInstallable(false);
        }
        setDeferredPrompt(null);
    };

    const currentPrice = currency === 'USD' ? rates.usd : rates.nad;

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden selection:bg-primary selection:text-black">
            <Seo
                title="Bitcoin Dashboard"
                description="Real-time Bitcoin analytics, historical data, and network statistics."
                canonical="/dashboard"
            />

            {/* Cyberpunk Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.9)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-primary/30 pb-6 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link to="/" className="p-2 hover:bg-primary/20 rounded-full transition-colors text-primary">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-primary tracking-tighter">
                                SYSTEM_DASHBOARD
                            </h1>
                            <p className="text-xs text-green-400/60 mt-1">
                                v0.0.1 // CONNECTED TO MAINNET
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        {isInstallable && (
                            <Button
                                onClick={handleInstallClick}
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-black gap-2"
                            >
                                <Download className="h-4 w-4" />
                                INSTALL APP
                            </Button>
                        )}

                        <div className="flex bg-primary/10 rounded-lg p-1 border border-primary/30">
                            <button
                                onClick={() => setCurrency('USD')}
                                className={`px-4 py-1 rounded-md text-sm font-bold transition-all ${currency === 'USD' ? 'bg-primary text-black shadow-[0_0_10px_rgba(247,147,26,0.5)]' : 'text-green-400 hover:text-primary'}`}
                            >
                                USD
                            </button>
                            <button
                                onClick={() => setCurrency('NAD')}
                                className={`px-4 py-1 rounded-md text-sm font-bold transition-all ${currency === 'NAD' ? 'bg-primary text-black shadow-[0_0_10px_rgba(247,147,26,0.5)]' : 'text-green-400 hover:text-primary'}`}
                            >
                                NAD
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats & Dials */}
                    <div className="space-y-8">
                        {/* Current Price Card */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative overflow-hidden group hover:border-primary transition-colors">
                            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                                <TrendingUp className="h-24 w-24 text-primary" />
                            </div>
                            <h2 className="text-sm text-green-400/60 mb-2 flex items-center gap-2">
                                <DollarSign className="h-4 w-4" /> CURRENT PRICE
                            </h2>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">
                                {priceLoading ? 'LOADING...' : currency === 'USD' ? `$${currentPrice?.toLocaleString()}` : `N$${currentPrice?.toLocaleString()}`}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-primary animate-pulse">● LIVE</span>
                                <span className="text-green-400/60"> // VIA BITPAY API</span>
                            </div>
                        </div>

                        {/* Fear & Greed Index (Mock Dial) */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg">
                            <h2 className="text-sm text-green-400/60 mb-6 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> MARKET SENTIMENT
                            </h2>
                            <div className="relative h-40 flex items-center justify-center">
                                {/* Simple CSS Gauge */}
                                <div className="w-32 h-32 rounded-full border-8 border-gray-800 border-t-primary border-r-primary rotate-45 relative shadow-[0_0_20px_rgba(247,147,26,0.2)]">
                                    <div className="absolute inset-0 flex items-center justify-center flex-col -rotate-45">
                                        <span className="text-3xl font-bold text-white">76</span>
                                        <span className="text-xs text-primary font-bold">GREED</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network Stats */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg">
                            <h2 className="text-sm text-green-400/60 mb-4 flex items-center gap-2">
                                <Zap className="h-4 w-4" /> NETWORK STATUS
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                    <span>Hashrate</span>
                                    <span className="text-white font-bold">650 EH/s</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                    <span>Difficulty</span>
                                    <span className="text-white font-bold">88.1 T</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Next Halving</span>
                                    <span className="text-primary font-bold">~1,240 Days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle/Right: Chart & History */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Price Chart */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[500px] relative flex flex-col">
                            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                <h2 className="text-sm text-green-400/60 flex items-center gap-2">
                                    <Activity className="h-4 w-4" /> PRICE ACTION
                                </h2>
                                <div className="flex bg-primary/10 rounded-lg p-1 border border-primary/30">
                                    {(['1H', '24H', '7D', '30D'] as const).map((tf) => (
                                        <button
                                            key={tf}
                                            onClick={() => setTimeframe(tf)}
                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${timeframe === tf ? 'bg-primary text-black' : 'text-green-400 hover:text-primary'}`}
                                        >
                                            {tf}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 w-full min-h-0 relative">
                                {chartLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                                        <div className="text-primary animate-pulse">LOADING CHART DATA...</div>
                                    </div>
                                )}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#4ade80"
                                            tick={{ fill: '#4ade80', fontSize: 10 }}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            stroke="#4ade80"
                                            tick={{ fill: '#4ade80', fontSize: 10 }}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[(dataMin: number) => Math.floor(dataMin * 0.995), (dataMax: number) => Math.ceil(dataMax * 1.005)]}
                                            tickFormatter={(value) => {
                                                const formatted = Math.round(value / 1000);
                                                return currency === 'USD' ? `$${formatted}k` : `N$${formatted}k`;
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #f7931a', color: '#fff' }}
                                            itemStyle={{ color: '#f7931a' }}
                                            formatter={(value: number) => [currency === 'USD' ? `$${value.toLocaleString()}` : `N$${value.toLocaleString()}`, 'Price']}
                                            labelFormatter={(label) => label}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#f7931a"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 6, fill: '#f7931a' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* On This Day Carousel */}
                        <OnThisDayCarousel currency={currency} currentPrice={currentPrice} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
