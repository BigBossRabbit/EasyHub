import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, TrendingUp, Calendar, Activity, Zap, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';

// Mock historical data for the chart (in a real app, fetch from CoinGecko API)
const generateMockData = (currency: 'USD' | 'NAD') => {
    const basePrice = currency === 'USD' ? 95000 : 1700000;
    const volatility = currency === 'USD' ? 2000 : 36000;

    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: basePrice + (Math.random() - 0.5) * volatility + (i * (volatility / 10))
        };
    });
};

const Dashboard = () => {
    const [currency, setCurrency] = useState<'USD' | 'NAD'>('USD');
    const [chartData, setChartData] = useState(generateMockData('USD'));
    const { rates, loading } = useBitcoinPrice();

    // "On This Day" mock data
    const historicalPrice = currency === 'USD' ? 16500 : 297000; // Example: Price 2 years ago
    const year = 2022;

    useEffect(() => {
        setChartData(generateMockData(currency));
    }, [currency]);

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
                <header className="flex items-center justify-between mb-12 border-b border-primary/30 pb-6">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-primary/20 rounded-full transition-colors text-primary">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter">
                                SYSTEM_DASHBOARD
                            </h1>
                            <p className="text-xs text-green-400/60 mt-1">
                                v2.0.45 // CONNECTED TO MAINNET
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                                {loading ? 'LOADING...' : currency === 'USD' ? `$${currentPrice?.toLocaleString()}` : `N$${currentPrice?.toLocaleString()}`}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-primary animate-pulse">● LIVE</span>
                                <span className="text-green-400/60"> // UPDATED 10s AGO</span>
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
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[400px] relative">
                            <h2 className="text-sm text-green-400/60 mb-6 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> PRICE ACTION (30D)
                            </h2>
                            <ResponsiveContainer width="100%" height="85%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#4ade80"
                                        tick={{ fill: '#4ade80', fontSize: 10 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#4ade80"
                                        tick={{ fill: '#4ade80', fontSize: 10 }}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={['auto', 'auto']}
                                        tickFormatter={(value) => currency === 'USD' ? `$${value / 1000}k` : `N$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #f7931a', color: '#fff' }}
                                        itemStyle={{ color: '#f7931a' }}
                                        formatter={(value: number) => [currency === 'USD' ? `$${value.toLocaleString()}` : `N$${value.toLocaleString()}`, 'Price']}
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

                        {/* On This Day */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="p-4 bg-primary/10 rounded-full border border-primary/30">
                                    <Calendar className="h-8 w-8 text-primary" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-lg font-bold text-white mb-1">ON THIS DAY IN {year}</h2>
                                    <p className="text-green-400/80 text-sm mb-4">
                                        Bitcoin was trading at a significantly different valuation. HODLers from this era are now up significantly.
                                    </p>
                                    <div className="text-3xl font-bold text-primary">
                                        {currency === 'USD' ? `$${historicalPrice.toLocaleString()}` : `N$${historicalPrice.toLocaleString()}`}
                                    </div>
                                </div>
                                <div className="text-right hidden md:block">
                                    <div className="text-xs text-green-400/60 mb-1">ROI SINCE THEN</div>
                                    <div className="text-2xl font-bold text-green-400">
                                        +{((((currentPrice || 0) - historicalPrice) / historicalPrice) * 100).toFixed(0)}%
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
