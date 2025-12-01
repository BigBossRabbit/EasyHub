import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Activity, Zap, DollarSign, Download, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Seo from '@/components/Seo';
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { useBitcoinNetworkStats } from '@/hooks/useBitcoinNetworkStats';
import { useFearGreedIndex } from '@/hooks/useFearGreedIndex';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OnThisDayCarousel from '@/components/OnThisDayCarousel';
import { useFuelPriceData } from '@/hooks/useFuelPriceData';
import { useRetailPriceData } from '@/hooks/useRetailPriceData';

const Dashboard = () => {
    const [currency, setCurrency] = useState<'USD' | 'NAD'>('USD');
    const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
    const [chartData, setChartData] = useState<any[]>([]);
    const [chartType, setChartType] = useState<'price' | 'fuel' | 'retail'>('price');
    const [selectedCommodity, setSelectedCommodity] = useState<'bread' | 'milk' | 'eggs'>('bread');
    const { rates, loading: priceLoading } = useBitcoinPrice();
    const { stats, loading: statsLoading } = useBitcoinNetworkStats();
    const { data: fearGreedData, loading: fearGreedLoading } = useFearGreedIndex();
    const { data: fuelData, loading: fuelLoading } = useFuelPriceData(currency);
    const { data: retailData, loading: retailLoading } = useRetailPriceData(currency, selectedCommodity);


    const [chartLoading, setChartLoading] = useState(true);

    // Fetch Chart Data
    useEffect(() => {
        const fetchChartData = async () => {
            setChartLoading(true);
            try {
                if (chartType === 'price') {
                    // Existing BTC Price Logic
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
                } else if (chartType === 'fuel') {
                    // Fuel Price Logic
                    // Convert to Satoshis for better graph scaling (1 BTC = 100,000,000 sats)
                    const formattedData = fuelData.map(item => ({
                        date: item.date,
                        price: Math.round(item.btcPrice * 100000000), // Convert to Sats
                        btcPrice: item.btcPrice, // Keep original for tooltip
                        fiatPrice: item.fiatPrice,
                        timestamp: item.timestamp,
                        unit: item.unit
                    }));
                    setChartData(formattedData);
                } else if (chartType === 'retail') {
                    // Retail Price Logic
                    const formattedData = retailData.map(item => ({
                        date: item.date,
                        price: Math.round(item.btcPrice * 100000000), // Convert to Sats
                        btcPrice: item.btcPrice, // Keep original for tooltip
                        fiatPrice: item.fiatPrice,
                        timestamp: item.timestamp,
                        unit: item.unit
                    }));
                    setChartData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
            } finally {
                setChartLoading(false);
            }
        };

        fetchChartData();
    }, [currency, timeframe, chartType, selectedCommodity, fuelData, retailData]);


    const currentPrice = currency === 'USD' ? rates.usd : rates.nad;

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden selection:bg-primary selection:text-black">
            <Seo
                title="Bitcoin Dashboard"
                description="Real-time Bitcoin analytics, historical data, and network statistics."
                canonical="/easystats"
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
                                v0.0.2 // CONNECTED TO MAINNET
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">



                        <div className="flex items-center gap-2">
                            <Link to="/tpok">
                                <Button
                                    variant="ghost"
                                    className="text-green-400 hover:text-primary hover:bg-primary/10 gap-2"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    TPOK
                                </Button>
                            </Link>

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
                            <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-wider break-words">
                                {priceLoading ? 'LOADING...' : currency === 'USD' ? `$${currentPrice?.toLocaleString()}` : `N$${currentPrice?.toLocaleString()}`}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-primary animate-pulse">● LIVE</span>
                                <span className="text-green-400/60"> // VIA BITPAY API</span>
                            </div>
                        </div>

                        {/* Fear & Greed Index - Enhanced */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg">
                            <h2 className="text-sm text-green-400/60 mb-6 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> MARKET SENTIMENT
                            </h2>
                            {fearGreedLoading ? (
                                <div className="text-primary animate-pulse text-center py-16">LOADING...</div>
                            ) : fearGreedData ? (
                                <div className="space-y-4">
                                    {/* Gauge Display */}
                                    <div className="relative h-40 flex items-center justify-center">
                                        {/* Dynamic CSS Gauge with pulse animation */}
                                        <div
                                            className={`w-32 h-32 rounded-full border-8 border-gray-800 relative transition-all duration-1000 ${fearGreedData.trend === 'up' ? 'shadow-[0_0_30px_rgba(74,222,128,0.4)]' :
                                                fearGreedData.trend === 'down' ? 'shadow-[0_0_30px_rgba(239,68,68,0.4)]' :
                                                    'shadow-[0_0_20px_rgba(247,147,26,0.2)]'
                                                }`}
                                            style={{
                                                borderTopColor: fearGreedData.value >= 50 ? '#4ade80' : '#ef4444',
                                                borderRightColor: fearGreedData.value >= 50 ? '#4ade80' : '#ef4444',
                                                transform: `rotate(${(fearGreedData.value / 100) * 180}deg)`,
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center flex-col" style={{ transform: `rotate(-${(fearGreedData.value / 100) * 180}deg)` }}>
                                                <span className="text-3xl font-bold text-white">{fearGreedData.value}</span>
                                                <span className={`text-xs font-bold uppercase ${fearGreedData.value >= 75 ? 'text-green-400' : fearGreedData.value >= 50 ? 'text-green-400/70' : fearGreedData.value >= 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {fearGreedData.valueClassification}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trend Indicators */}
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        {/* 24h Change */}
                                        <div className="bg-black/30 border border-primary/20 p-3 rounded">
                                            <div className="text-green-400/60 mb-1">24H CHANGE</div>
                                            <div className={`flex items-center gap-1 font-bold ${fearGreedData.change && fearGreedData.change > 0 ? 'text-green-400' :
                                                fearGreedData.change && fearGreedData.change < 0 ? 'text-red-400' :
                                                    'text-gray-400'
                                                }`}>
                                                {fearGreedData.change && fearGreedData.change > 0 && '↑'}
                                                {fearGreedData.change && fearGreedData.change < 0 && '↓'}
                                                {fearGreedData.change !== undefined ? (
                                                    fearGreedData.change > 0 ? `+${fearGreedData.change}` : fearGreedData.change
                                                ) : '0'}
                                            </div>
                                        </div>

                                        {/* Trend Direction */}
                                        <div className="bg-black/30 border border-primary/20 p-3 rounded">
                                            <div className="text-green-400/60 mb-1">TREND</div>
                                            <div className={`font-bold uppercase flex items-center gap-1 ${fearGreedData.trend === 'up' ? 'text-green-400' :
                                                fearGreedData.trend === 'down' ? 'text-red-400' :
                                                    'text-gray-400'
                                                }`}>
                                                {fearGreedData.trend === 'up' && '↗ Rising'}
                                                {fearGreedData.trend === 'down' && '↘ Falling'}
                                                {fearGreedData.trend === 'stable' && '→ Stable'}
                                            </div>
                                        </div>

                                        {/* Yesterday's Value */}
                                        <div className="bg-black/30 border border-primary/20 p-3 rounded">
                                            <div className="text-green-400/60 mb-1">YESTERDAY</div>
                                            <div className="text-white font-bold">
                                                {fearGreedData.previousValue || fearGreedData.value}
                                            </div>
                                        </div>

                                        {/* Current Status */}
                                        <div className="bg-black/30 border border-primary/20 p-3 rounded">
                                            <div className="text-green-400/60 mb-1">STATUS</div>
                                            <div className={`font-bold uppercase text-xs ${fearGreedData.value >= 75 ? 'text-green-400' :
                                                fearGreedData.value >= 50 ? 'text-green-400/70' :
                                                    fearGreedData.value >= 25 ? 'text-yellow-400' :
                                                        'text-red-400'
                                                }`}>
                                                {fearGreedData.value >= 75 ? 'Bullish' :
                                                    fearGreedData.value >= 50 ? 'Optimistic' :
                                                        fearGreedData.value >= 25 ? 'Cautious' :
                                                            'Bearish'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-red-400 text-center py-16 text-sm">Failed to load</div>
                            )}
                        </div>

                        {/* Network Stats */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg">
                            <h2 className="text-sm text-green-400/60 mb-4 flex items-center gap-2">
                                <Zap className="h-4 w-4" /> NETWORK STATUS
                            </h2>
                            {statsLoading ? (
                                <div className="text-primary animate-pulse text-center py-8">LOADING...</div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm">Hashrate</span>
                                        <span className="text-white font-bold text-sm">{stats.hashrate || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm">Difficulty</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold text-sm">
                                                {stats.difficulty ? `${(stats.difficulty / 1e12).toFixed(1)} T` : 'N/A'}
                                            </span>
                                            {stats.difficultyChange !== null && (
                                                <span className={`text-xs ${stats.difficultyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {stats.difficultyChange >= 0 ? '↑' : '↓'} {Math.abs(stats.difficultyChange).toFixed(2)}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm">Next Halving</span>
                                        <span className="text-primary font-bold text-sm">
                                            {stats.nextHalving ? `~${stats.nextHalving.daysRemaining.toLocaleString()} Days` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm">Mempool</span>
                                        <span className="text-white font-bold text-sm">
                                            {stats.mempoolSize ? `${stats.mempoolSize.toLocaleString()} tx` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm">Avg Block Time</span>
                                        <span className="text-white font-bold text-sm">
                                            {stats.blockTime ? `${Math.floor(stats.blockTime / 60)}m ${stats.blockTime % 60}s` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Block Height</span>
                                        <span className="text-white font-bold text-sm">
                                            {stats.blockHeight ? stats.blockHeight.toLocaleString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle/Right: Chart & History */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Price Chart */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[500px] relative flex flex-col">
                            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                <h2 className="text-sm text-green-400/60 flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    {chartType === 'price' ? 'PRICE ACTION' :
                                        chartType === 'fuel' ? 'FUEL PRICE (SATS)' :
                                            `${selectedCommodity.toUpperCase()} PRICE (SATS)`}
                                </h2>
                                <div className="flex gap-2">
                                    {chartType === 'price' && (
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
                                    )}

                                    <div className="relative">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={`text-xs font-bold h-full ${chartType !== 'price'
                                                        ? 'bg-primary text-black border-primary'
                                                        : 'text-green-400 border-primary/30 hover:text-primary hover:border-primary bg-transparent'
                                                        }`}
                                                >
                                                    {chartType === 'price' ? 'Alt Graphs' :
                                                        chartType === 'fuel' ? 'Fuel Prices' :
                                                            selectedCommodity.charAt(0).toUpperCase() + selectedCommodity.slice(1)}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-black border border-primary/30 text-green-400">
                                                <DropdownMenuItem onClick={() => setChartType('price')} className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer">
                                                    BTC Price (Default)
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-primary/20" />
                                                <DropdownMenuItem onClick={() => setChartType('fuel')} className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer">
                                                    Fuel Prices in BTC
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-primary/20" />
                                                <DropdownMenuLabel className="text-primary">Retail Goods in BTC</DropdownMenuLabel>
                                                {(['bread', 'milk', 'eggs'] as const).map(commodity => (
                                                    <DropdownMenuItem
                                                        key={commodity}
                                                        onClick={() => {
                                                            setChartType('retail');
                                                            setSelectedCommodity(commodity);
                                                        }}
                                                        className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer pl-6"
                                                    >
                                                        {commodity.charAt(0).toUpperCase() + commodity.slice(1)}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
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
                                            width={60}
                                            domain={['auto', 'auto']}
                                            tickFormatter={(value) => {
                                                if (chartType === 'price') {
                                                    const formatted = Math.round(value / 1000);
                                                    return currency === 'USD' ? `$${formatted}k` : `N$${formatted}k`;
                                                } else {
                                                    // For Alt Graphs, value is in Sats
                                                    // Use 'k' notation for thousands to save space
                                                    if (value >= 1000) {
                                                        return `${Math.round(value / 1000)}k sats`;
                                                    }
                                                    return `${value} sats`;
                                                }
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #f7931a', color: '#fff' }}
                                            itemStyle={{ color: '#f7931a' }}
                                            formatter={(value: number, name: string, props: any) => {
                                                if (chartType === 'price') {
                                                    return [currency === 'USD' ? `$${value.toLocaleString()}` : `N$${value.toLocaleString()}`, 'Price'];
                                                } else {
                                                    const unit = props.payload.unit || '';
                                                    const fiatPrice = props.payload.fiatPrice;
                                                    const btcPrice = props.payload.btcPrice;
                                                    const fiatFormatted = currency === 'USD' ? `$${fiatPrice}` : `N$${fiatPrice}`;
                                                    return [
                                                        <div key="tooltip" className="flex flex-col gap-1">
                                                            <span>{value.toLocaleString()} sats / {unit}</span>
                                                            <span className="text-xs text-gray-400">({btcPrice.toFixed(8)} BTC)</span>
                                                            <span className="text-xs text-gray-400">({fiatFormatted} / {unit})</span>
                                                        </div>,
                                                        'Price'
                                                    ];
                                                }
                                            }}
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
