import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Activity, Zap, DollarSign, BookOpen, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

interface ChartDataPoint {
    date: string;
    price: number;
    timestamp: number;
    btcPrice?: number;
    fiatPrice?: number;
    unit?: string;
}

const SUPPORTED_CURRENCIES = [
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
    { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    { code: 'ZAR', label: 'South African Rand', symbol: 'R' },
];

const Dashboard = () => {
    const [currency, setCurrency] = useState<'USD' | 'NAD' | 'OTHER'>('USD');
    const [otherCurrency, setOtherCurrency] = useState(SUPPORTED_CURRENCIES[0]);
    const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | '1Y' | 'ALL'>('24H');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [chartType, setChartType] = useState<'price' | 'fuel' | 'retail'>('price');
    const [selectedCommodity, setSelectedCommodity] = useState<'bread' | 'milk' | 'eggs'>('bread');
    const { rates, loading: priceLoading } = useBitcoinPrice();
    const { stats, loading: statsLoading } = useBitcoinNetworkStats();
    const { data: fearGreedData, loading: fearGreedLoading } = useFearGreedIndex();

    // Pass appropriate currency to hooks
    const effectiveCurrency = currency === 'OTHER' ? 'USD' : currency; // Default hooks to USD if OTHER selected (custom conversion logic needed for others if essential, but keeping simple for now)
    const { data: fuelData } = useFuelPriceData(effectiveCurrency as 'USD' | 'NAD');
    const { data: retailData } = useRetailPriceData(effectiveCurrency as 'USD' | 'NAD', selectedCommodity);

    const [chartLoading, setChartLoading] = useState(true);

    // Fetch Chart Data
    useEffect(() => {
        const fetchChartData = async () => {
            setChartLoading(true);
            try {
                if (chartType === 'price') {
                    let days = '1';
                    if (timeframe === '7D') days = '7';
                    if (timeframe === '30D') days = '30';
                    if (timeframe === '1Y') days = '365';
                    if (timeframe === 'ALL') days = 'max';

                    let vsCurrency = 'usd';
                    if (currency === 'NAD') vsCurrency = 'zar'; // Proxy
                    if (currency === 'OTHER') vsCurrency = otherCurrency.code.toLowerCase();

                    const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vsCurrency}&days=${days}`);
                    if (!response.ok) throw new Error('Failed to fetch chart data');

                    const data = await response.json();
                    let prices: [number, number][] = data.prices;

                    // Filter for 1H if selected
                    if (timeframe === '1H') {
                        const oneHourAgo = Date.now() - 3600000;
                        prices = prices.filter((p) => p[0] >= oneHourAgo);
                    }

                    const formattedData: ChartDataPoint[] = prices.map((item) => {
                        const date = new Date(item[0]);
                        let dateLabel = '';

                        if (timeframe === '1H' || timeframe === '24H') {
                            dateLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        } else if (timeframe === 'ALL' || timeframe === '1Y') {
                            dateLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
                    const formattedData = fuelData.map(item => ({
                        date: item.date,
                        price: Math.round(item.btcPrice * 100000000), // Sats
                        btcPrice: item.btcPrice,
                        fiatPrice: item.fiatPrice,
                        timestamp: item.timestamp,
                        unit: item.unit
                    }));
                    setChartData(formattedData);
                } else if (chartType === 'retail') {
                    const formattedData = retailData.map(item => ({
                        date: item.date,
                        price: Math.round(item.btcPrice * 100000000), // Sats
                        btcPrice: item.btcPrice,
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
    }, [currency, timeframe, chartType, selectedCommodity, fuelData, retailData, otherCurrency]);

    const getSymbol = () => {
        if (currency === 'USD') return '$';
        if (currency === 'NAD') return 'N$';
        return otherCurrency.symbol;
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden selection:bg-primary selection:text-black">
            <Seo
                title="Bitcoin Dashboard"
                description="Real-time Bitcoin analytics, historical data, and network statistics."
                canonical="/easystats"
            />

            {/* Cyberpunk Background Grid */}
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
                            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tighter">
                                SYSTEM_DASHBOARD
                            </h1>
                            <p className="text-xs text-green-400/60 mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                CONNECTED TO MAINNET
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <Link to="/tpok">
                            <Button variant="ghost" className="text-green-400 hover:text-primary hover:bg-primary/10 gap-2">
                                <BookOpen className="h-4 w-4" />
                                TPOK
                            </Button>
                        </Link>

                        <div className="flex bg-primary/10 rounded-lg p-1 border border-primary/30">
                            <button
                                onClick={() => setCurrency('USD')}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'USD' ? 'bg-primary text-black shadow-[0_0_15px_rgba(247,147,26,0.4)]' : 'text-green-400 hover:text-primary'}`}
                            >
                                USD
                            </button>
                            <button
                                onClick={() => setCurrency('NAD')}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currency === 'NAD' ? 'bg-primary text-black shadow-[0_0_15px_rgba(247,147,26,0.4)]' : 'text-green-400 hover:text-primary'}`}
                            >
                                NAD
                            </button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-1 ${currency === 'OTHER' ? 'bg-primary text-black shadow-[0_0_15px_rgba(247,147,26,0.4)]' : 'text-green-400 hover:text-primary'}`}
                                    >
                                        {currency === 'OTHER' ? otherCurrency.code : 'OTHER'} <ChevronDown className="h-3 w-3" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black border border-primary/30 text-green-400">
                                    <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-primary/20" />
                                    {SUPPORTED_CURRENCIES.map((curr) => (
                                        <DropdownMenuItem
                                            key={curr.code}
                                            onClick={() => {
                                                setCurrency('OTHER');
                                                setOtherCurrency(curr);
                                            }}
                                            className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer"
                                        >
                                            <span className="w-8">{curr.code}</span>
                                            <span className="text-muted-foreground">{curr.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Dials */}
                    <div className="space-y-8">
                        {/* Current Price Card */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative overflow-hidden group hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(247,147,26,0.2)]">
                            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                                <DollarSign className="h-24 w-24 text-primary animate-pulse" style={{ animationDuration: '3s' }} />
                            </div>
                            <h2 className="text-xs text-green-400/60 mb-2 flex items-center gap-2 font-bold tracking-widest">
                                CURRENT PRICE
                            </h2>
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tighter">
                                {priceLoading ? 'LOADING...' : `${getSymbol()}${rates.usd ? (currency === 'OTHER' ? 'Loading...' : (currency === 'USD' ? rates.usd : rates.nad)?.toLocaleString()) : '...'}`}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-primary animate-pulse">● LIVE DATA</span>
                                <span className="text-green-400/40">:: COINGECKO API</span>
                            </div>
                        </div>

                        {/* Fear & Greed Gauge */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative">
                            <h2 className="text-xs text-green-400/60 mb-6 flex items-center gap-2 font-bold tracking-widest">
                                MARKET SENTIMENT
                            </h2>
                            {fearGreedLoading ? (
                                <div className="text-primary animate-pulse text-center py-16">LOADING...</div>
                            ) : fearGreedData ? (
                                <div className="relative flex flex-col items-center">
                                    <div className="relative w-48 h-24 overflow-hidden mb-4">
                                        <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-gray-800"></div>
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom transition-all duration-1000 ease-out"
                                            style={{
                                                background: `conic-gradient(from 180deg, #ef4444 0%, #eab308 50%, #22c55e 100%)`,
                                                transform: 'rotate(0deg)',
                                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                                            }}
                                        ></div>
                                        {/* Needle */}
                                        <div
                                            className="absolute bottom-0 left-1/2 w-1 h-full bg-white origin-bottom transition-transform duration-1000 ease-out z-10"
                                            style={{
                                                transform: `translateX(-50%) rotate(${((fearGreedData.value / 100) * 180) - 90}deg)`
                                            }}
                                        ></div>
                                        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-black rounded-full border-2 border-white -translate-x-1/2 translate-y-1/2 z-20"></div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-white mb-1">{fearGreedData.value}</div>
                                        <div className={`text-sm font-bold uppercase tracking-widest ${fearGreedData.value >= 50 ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {fearGreedData.valueClassification}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-red-400 text-center">Data Unavailable</div>
                            )}
                        </div>

                        {/* Network Stats with Progress Bars */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg space-y-6">
                            <h2 className="text-xs text-green-400/60 mb-4 flex items-center gap-2 font-bold tracking-widest">
                                TIMECHAIN STATUS
                            </h2>
                            {statsLoading ? (
                                <div className="text-primary animate-pulse text-center py-8">CALCULATING...</div>
                            ) : (
                                <>
                                    {/* Halving Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">Halving Progress</span>
                                            <span className="text-primary font-bold">88.4%</span>
                                        </div>
                                        <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary/50 to-primary w-[88.4%] shadow-[0_0_10px_rgba(247,147,26,0.5)]"></div>
                                        </div>
                                        <div className="text-right text-[10px] text-green-400/60">
                                            ETA: {stats.nextHalving?.daysRemaining || 'N/A'} Days
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase">Block Height</div>
                                            <div className="text-xl font-bold text-white">{stats.blockHeight?.toLocaleString() || '---'}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase">Hashrate</div>
                                            <div className="text-xl font-bold text-white">{stats.hashrate || '---'}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase">Avg Fees</div>
                                            <div className="text-xl font-bold text-primary">{stats.fees?.halfHourFee || 0} sat/vB</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase">Difficulty</div>
                                            <div className="text-xl font-bold text-white">{(stats.difficulty / 1e12).toFixed(0)} T</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Advanced Charts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Area Chart */}
                        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg h-[600px] relative flex flex-col">
                            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        {chartType === 'price' ? 'BTC Price Action' :
                                            chartType === 'fuel' ? 'Fuel vs Bitcoin' :
                                                `${selectedCommodity.charAt(0).toUpperCase() + selectedCommodity.slice(1)} vs Bitcoin`}
                                    </h2>
                                    <p className="text-xs text-green-400/60 font-mono">
                                        {chartData.length} Data Points // {timeframe} Interval
                                    </p>
                                </div>

                                <div className="flex gap-2 items-center">
                                    {chartType === 'price' && (
                                        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
                                            {(['24H', '7D', '30D', '1Y', 'ALL'] as const).map((tf) => (
                                                <button
                                                    key={tf}
                                                    onClick={() => setTimeframe(tf)}
                                                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${timeframe === tf ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                                                >
                                                    {tf}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-8 border-primary/30 text-primary hover:bg-primary/10">
                                                Chart: {chartType === 'price' ? 'Price' : chartType === 'fuel' ? 'Fuel' : 'Retail'} <ChevronDown className="h-3 w-3 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-black border border-primary/30 text-green-400">
                                            <DropdownMenuItem onClick={() => setChartType('price')}>BTC Price</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setChartType('fuel')}>Fuel Prices</DropdownMenuItem>
                                            <DropdownMenuLabel className="text-xs text-gray-500">Commodities</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => { setChartType('retail'); setSelectedCommodity('bread'); }}>Bread</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => { setChartType('retail'); setSelectedCommodity('milk'); }}>Milk</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => { setChartType('retail'); setSelectedCommodity('eggs'); }}>Eggs</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="flex-1 w-full min-h-0 relative">
                                {chartLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-2">
                                            <Activity className="h-8 w-8 text-primary animate-spin" />
                                            <span className="text-primary text-xs font-mono animate-pulse">FETCHING_ON_CHAIN_DATA...</span>
                                        </div>
                                    </div>
                                )}
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f7931a" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f7931a" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#666"
                                            tick={{ fill: '#666', fontSize: 10 }}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={40}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            tick={{ fill: '#666', fontSize: 10 }}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={['auto', 'auto']}
                                            width={60}
                                            tickFormatter={(value) => {
                                                if (chartType === 'price') {
                                                    return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
                                                }
                                                return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(0,0,0,0.9)',
                                                border: '1px solid #f7931a',
                                                color: '#fff',
                                                borderRadius: '8px',
                                                boxShadow: '0 0 20px rgba(247,147,26,0.1)'
                                            }}
                                            itemStyle={{ color: '#f7931a' }}
                                            labelStyle={{ color: '#aaa', marginBottom: '0.5rem', fontSize: '12px' }}
                                            formatter={(value: number, name: string, props: { payload: ChartDataPoint }) => {
                                                if (chartType === 'price') {
                                                    return [`${getSymbol()}${value.toLocaleString()}`, 'Price'];
                                                } else {
                                                    return [`${value.toLocaleString()} sats`, 'Cost in Sats'];
                                                }
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#f7931a"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            activeDot={{ r: 6, fill: '#f7931a', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* On This Day Carousel */}
                        <OnThisDayCarousel currency={currency === 'OTHER' ? 'USD' : currency} currentPrice={currency === 'OTHER' ? rates.usd : (currency === 'USD' ? rates.usd : rates.nad)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
