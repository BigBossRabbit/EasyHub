import { useState, useEffect } from 'react';
import { Calendar, Zap, TrendingUp } from 'lucide-react';

interface BitcoinEvent {
    date: string; // MM-DD format
    year: number;
    title: string;
    description: string;
    significance: 'high' | 'medium' | 'low';
}

// Historical Bitcoin events database - organized by date (MM-DD)
// Covering Bitcoin's entire history from 2008-2025
const BITCOIN_EVENTS: BitcoinEvent[] = [
    // January
    { date: '01-03', year: 2009, title: 'Genesis Block Mined', description: 'Satoshi Nakamoto mined the first Bitcoin block, embedding "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"', significance: 'high' },
    { date: '01-03', year: 2019, title: 'Proof of Keys Day', description: 'Annual event encouraging users to withdraw funds from exchanges to self-custody wallets', significance: 'medium' },
    { date: '01-10', year: 2024, title: 'Bitcoin Spot ETF Approved', description: 'The SEC approved the first Bitcoin spot ETFs in the United States, marking a major milestone for institutional adoption', significance: 'high' },
    { date: '01-11', year: 2024, title: 'Bitcoin ETFs Start Trading', description: 'Spot Bitcoin ETFs began trading in the US, seeing record-breaking volume on day one', significance: 'high' },
    { date: '01-12', year: 2009, title: 'First Bitcoin Transaction', description: 'Satoshi sent 10 BTC to Hal Finney in the first-ever Bitcoin transaction', significance: 'high' },
    { date: '01-14', year: 2016, title: 'Lightning Whitepaper Released', description: 'Joseph Poon and Thaddeus Dryja published the Lightning Network whitepaper, proposing a layer-2 scaling solution', significance: 'high' },
    { date: '01-14', year: 2016, title: 'Mike Hearn Quits Bitcoin', description: 'Prominent developer Mike Hearn declared Bitcoin "failed" and quit, causing a temporary price drop', significance: 'medium' },
    { date: '01-15', year: 2015, title: 'Bitstamp Exchange Hacked', description: '19,000 BTC stolen from Bitstamp exchange, highlighting early security challenges', significance: 'medium' },
    { date: '01-29', year: 2011, title: 'Silk Road Launched', description: 'The Silk Road marketplace launched, becoming the first major real-world use case for Bitcoin', significance: 'medium' },

    // February
    { date: '02-07', year: 2011, title: 'Mt. Gox Hack', description: 'Mt. Gox suffered its first hack, losing significant funds and exposing early exchange vulnerabilities', significance: 'medium' },
    { date: '02-09', year: 2011, title: 'Bitcoin Reaches Parity with USD', description: 'Bitcoin reached $1.00 for the first time, achieving parity with the US Dollar', significance: 'high' },
    { date: '02-08', year: 2021, title: 'Tesla Buys Bitcoin', description: 'Tesla announced a $1.5 billion Bitcoin purchase, signaling major corporate adoption', significance: 'high' },
    { date: '02-24', year: 2014, title: 'Mt. Gox Collapse', description: 'Mt. Gox filed for bankruptcy after losing 850,000 BTC, the largest exchange hack in history', significance: 'high' },
    { date: '02-25', year: 2018, title: 'Lightning Pizza Day', description: 'Laszlo Hanyecz bought two pizzas using the Lightning Network, mirroring his original 2010 transaction', significance: 'medium' },

    // March
    { date: '03-09', year: 1993, title: 'Cypherpunk Manifesto Released', description: 'Eric Hughes published "A Cypherpunk\'s Manifesto", laying the philosophical groundwork for Bitcoin', significance: 'medium' },
    { date: '03-17', year: 2010, title: 'First Bitcoin Exchange Opens', description: 'BitcoinMarket.com, the first Bitcoin exchange, launched', significance: 'medium' },
    { date: '03-13', year: 2024, title: 'Bitcoin Reaches New ATH', description: 'Bitcoin surpassed $73,000, setting a new all-time high before the 2024 halving', significance: 'high' },
    { date: '03-12', year: 2020, title: 'Black Thursday Crash', description: 'Bitcoin crashed 50% to $3,800 during COVID-19 panic, one of the largest single-day drops', significance: 'high' },
    { date: '03-28', year: 2013, title: 'Bitcoin Passes $1B Market Cap', description: 'The total value of all Bitcoin in circulation surpassed $1 billion USD for the first time', significance: 'high' },

    // April
    { date: '04-05', year: 1975, title: 'Satoshi Nakamoto\'s Birthday', description: 'The date Satoshi Nakamoto entered as their birthday on P2P Foundation profile (likely a reference to Executive Order 6102)', significance: 'medium' },
    { date: '04-23', year: 2011, title: 'Satoshi\'s Last Message', description: 'Satoshi Nakamoto sent their last known email: "I\'ve moved on to other things"', significance: 'high' },
    { date: '04-20', year: 2024, title: 'Fourth Bitcoin Halving', description: 'Bitcoin\'s fourth halving reduced block reward from 6.25 BTC to 3.125 BTC', significance: 'high' },
    { date: '04-14', year: 2021, title: 'Coinbase Goes Public', description: 'Coinbase became the first major crypto exchange to go public on NASDAQ', significance: 'high' },

    // May
    { date: '05-10', year: 2017, title: 'First Lightning Network Tx', description: 'Christian Decker made the first full payment on a lightning network testnet', significance: 'medium' },
    { date: '05-22', year: 2010, title: 'Bitcoin Pizza Day', description: 'Laszlo Hanyecz paid 10,000 BTC for two pizzas - the first real-world Bitcoin transaction', significance: 'high' },
    { date: '05-11', year: 2020, title: 'Third Bitcoin Halving', description: 'Bitcoin\'s third halving reduced block reward from 12.5 BTC to 6.25 BTC', significance: 'high' },
    { date: '05-19', year: 2021, title: 'China Mining Crackdown', description: 'China announced a crackdown on Bitcoin mining, causing a major hashrate drop', significance: 'high' },
    { date: '05-23', year: 2017, title: 'New York Agreement', description: 'Major industry players signed the NYA to scale Bitcoin via SegWit2x, leading to the Block Size War', significance: 'medium' },

    // June
    { date: '06-08', year: 2011, title: 'Bitcoin Reaches $30', description: 'Bitcoin hit $30 in its first major bull run before crashing to $2', significance: 'medium' },
    { date: '06-08', year: 2021, title: 'El Salvador Passes Bitcoin Law', description: 'El Salvador\'s congress passed the bill to make Bitcoin legal tender', significance: 'high' },
    { date: '06-09', year: 2021, title: 'El Salvador Announces Bitcoin Law', description: 'President Bukele announced El Salvador would adopt Bitcoin as legal tender', significance: 'high' },
    { date: '06-14', year: 2011, title: 'Wikileaks Bypasses Sanctions', description: 'After payment processors blocked donations, Wikileaks began accepting Bitcoin to bypass censorship', significance: 'high' },
    { date: '06-15', year: 2022, title: 'Celsius Halts Withdrawals', description: 'Celsius Network froze withdrawals, marking the start of the 2022 crypto crisis', significance: 'medium' },

    // July
    { date: '07-17', year: 2010, title: 'Mt. Gox Launches', description: 'Mt. Gox Bitcoin exchange launched, eventually handling 70% of all Bitcoin transactions', significance: 'medium' },
    { date: '07-09', year: 2016, title: 'Second Bitcoin Halving', description: 'Bitcoin\'s second halving reduced block reward from 25 BTC to 12.5 BTC', significance: 'high' },
    { date: '07-12', year: 2017, title: 'Bitcoin Sign Guy', description: 'A student held up a "Buy Bitcoin" sign behind Janet Yellen during a televised hearing', significance: 'medium' },
    { date: '07-20', year: 2023, title: 'Bitcoin Breaks $30,000', description: 'Bitcoin surpassed $30,000 for the first time in 2023, signaling recovery from bear market', significance: 'medium' },

    // August
    { date: '08-01', year: 2017, title: 'Bitcoin Independence Day', description: 'The User Activated Soft Fork (UASF) successfully activated, preventing the corporate takeover of Bitcoin (SegWit2x)', significance: 'high' },
    { date: '08-01', year: 2017, title: 'Bitcoin Cash Fork', description: 'Bitcoin Cash hard forked from Bitcoin, creating a new cryptocurrency', significance: 'medium' },
    { date: '08-02', year: 2016, title: 'Bitfinex Hack', description: '119,756 BTC were stolen from Bitfinex exchange, causing a 20% price drop', significance: 'medium' },
    { date: '08-08', year: 2017, title: 'SegWit Lock-In', description: 'Segregated Witness (SegWit) locked in, fixing transaction malleability and enabling Lightning Network', significance: 'high' },
    { date: '08-15', year: 2010, title: 'Value Overflow Incident', description: 'A bug allowed creation of 184 billion BTC. Fixed within hours - Bitcoin\'s only major exploit', significance: 'high' },
    { date: '08-18', year: 2008, title: 'Bitcoin.org Registered', description: 'Satoshi Nakamoto registered the domain name bitcoin.org', significance: 'high' },
    { date: '08-21', year: 2021, title: 'Bitcoin Infinity Day', description: 'Celebrated on 8/21 because 8 looks like infinity and 21 million is the supply cap', significance: 'low' },
    { date: '08-24', year: 2017, title: 'SegWit Activation', description: 'Segregated Witness officially activated on the Bitcoin mainnet', significance: 'high' },
    { date: '08-05', year: 2019, title: 'Bitcoin Breaks $12,000', description: 'Bitcoin surged past $12,000 in a mid-year rally', significance: 'medium' },

    // September
    { date: '09-07', year: 2021, title: 'El Salvador Adopts Bitcoin', description: 'El Salvador became the first country to adopt Bitcoin as legal tender', significance: 'high' },
    { date: '09-24', year: 2024, title: 'Bitcoin Breaks $64,000', description: 'Bitcoin surged past $64,000 as institutional interest continued to grow', significance: 'medium' },
    { date: '09-04', year: 2017, title: 'China ICO Ban', description: 'China banned Initial Coin Offerings, causing a temporary market crash', significance: 'medium' },

    // October
    { date: '10-01', year: 2013, title: 'Free Ross Day', description: 'Ross Ulbricht was arrested in connection to Silk Road, sparking the Free Ross movement', significance: 'medium' },
    { date: '10-05', year: 2009, title: 'First Bitcoin Valuation', description: 'New Liberty Standard established the first exchange rate: 1,309.03 BTC for $1 USD', significance: 'high' },
    { date: '10-06', year: 2014, title: 'Slaying of the BearWhale', description: 'The community absorbed a massive 30,000 BTC sell wall at $300, proving Bitcoin\'s resilience', significance: 'medium' },
    { date: '10-28', year: 2013, title: 'First Bitcoin ATM', description: 'The world\'s first Bitcoin ATM opened in a coffee shop in Vancouver, Canada', significance: 'medium' },
    { date: '10-31', year: 2008, title: 'Bitcoin Whitepaper Published', description: 'Satoshi Nakamoto published "Bitcoin: A Peer-to-Peer Electronic Cash System"', significance: 'high' },
    { date: '10-29', year: 2024, title: 'Bitcoin Reaches $72,000', description: 'Bitcoin climbed to $72,000 amid growing ETF inflows and institutional adoption', significance: 'medium' },
    { date: '10-21', year: 2021, title: 'Bitcoin ETF Launches', description: 'First Bitcoin futures ETF began trading in the US, opening crypto to traditional investors', significance: 'high' },

    // November
    { date: '11-13', year: 2014, title: 'This is GENTLEMEN!', description: 'A typo in a Reddit post ("This is gentlemen") became a legendary meme for Bitcoin price rallies', significance: 'low' },
    { date: '11-27', year: 2013, title: 'Bitcoin Breaks $1,000', description: 'Bitcoin exceeded $1,000 for the first time during the 2013 bull run', significance: 'high' },
    { date: '11-28', year: 2012, title: 'First Halving', description: 'Bitcoin\'s first halving reduced block reward from 50 BTC to 25 BTC', significance: 'high' },
    { date: '11-10', year: 2021, title: 'Bitcoin All-Time High', description: 'Bitcoin reached its all-time high of $69,000', significance: 'high' },

    // November 21st - Multiple events across years
    { date: '11-21', year: 2024, title: 'Bitcoin Surges Past $98,000', description: 'Bitcoin reached new heights above $98,000, continuing its post-halving bull run', significance: 'high' },
    { date: '11-21', year: 2013, title: 'Bitcoin Breaks $800', description: 'During the 2013 bull run, Bitcoin surpassed $800 for the first time', significance: 'medium' },
    { date: '11-21', year: 2017, title: 'Bitcoin Approaches $8,000', description: 'Bitcoin climbed toward $8,000 in the historic 2017 bull run', significance: 'medium' },
    { date: '11-21', year: 2020, title: 'Bitcoin Reaches $18,500', description: 'Bitcoin approached its 2017 all-time high, trading at $18,500', significance: 'medium' },
    { date: '11-21', year: 2015, title: 'Bitcoin Holds $300', description: 'Bitcoin stabilized around $300 during the post-2014 recovery period', significance: 'low' },
    { date: '11-21', year: 2018, title: 'Bitcoin Tests $4,500', description: 'Bitcoin fell to $4,500 during the 2018 bear market bottom', significance: 'medium' },
    { date: '11-21', year: 2022, title: 'Bitcoin Drops to $15,500', description: 'Bitcoin hit $15,500 in the FTX collapse aftermath', significance: 'medium' },
    { date: '11-21', year: 2019, title: 'Bitcoin Trades at $7,200', description: 'Bitcoin consolidated around $7,200 in the 2019 mid-cycle', significance: 'low' },

    // December
    { date: '12-05', year: 2013, title: 'China Bans Financial Institutions', description: 'China banned financial institutions from handling Bitcoin, causing a major crash', significance: 'medium' },
    { date: '12-17', year: 2017, title: 'Bitcoin Hits $20,000', description: 'Bitcoin reached $20,000 in the 2017 bull run peak', significance: 'medium' },
    { date: '12-18', year: 2013, title: 'HODL Meme Starts', description: 'A drunk forum post titled "I AM HODLING" created the most famous term in Bitcoin culture', significance: 'high' },
    { date: '12-16', year: 2020, title: 'Bitcoin Breaks 2017 ATH', description: 'Bitcoin surpassed its 2017 all-time high, beginning the 2020-2021 bull run', significance: 'medium' },
    { date: '12-26', year: 2011, title: 'Bitcoin vs Gold Parity', description: 'One Bitcoin became worth more than one ounce of gold for the first time (approximate date)', significance: 'medium' },
];

interface OnThisDayCarouselProps {
    currency: 'USD' | 'NAD';
    currentPrice: number | null;
}

const OnThisDayCarousel = ({ currency, currentPrice }: OnThisDayCarouselProps) => {
    const [relevantEvents, setRelevantEvents] = useState<BitcoinEvent[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Check if selected date is today
    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
    };

    useEffect(() => {
        // Get selected date in MM-DD format
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${month}-${day}`;

        // Find all events that happened on this day
        const events = BITCOIN_EVENTS.filter(event => event.date === dateStr);

        // Sort by year (most recent first)
        events.sort((a, b) => b.year - a.year);

        setRelevantEvents(events);
        setCurrentIndex(0);
    }, [selectedDate]);

    useEffect(() => {
        if (relevantEvents.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % relevantEvents.length);
        }, 21000); // 21 seconds (Bitcoin block time!)

        return () => clearInterval(interval);
    }, [relevantEvents.length]);

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const handleBackToToday = () => {
        setSelectedDate(new Date());
    };

    // Format date for display (e.g., "October 31")
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

    if (relevantEvents.length === 0) {
        return (
            <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-6 w-6 text-primary" />
                        <h2 className="text-sm text-green-400/60 font-bold">ON THIS DAY IN BITCOIN HISTORY</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevDay}
                            className="p-1 hover:bg-primary/20 rounded-full transition-colors text-primary"
                            aria-label="Previous Day"
                        >
                            ←
                        </button>
                        <span className="text-xs text-green-400/80 font-mono min-w-[80px] text-center">
                            {formatDate(selectedDate)}
                        </span>
                        <button
                            onClick={handleNextDay}
                            className="p-1 hover:bg-primary/20 rounded-full transition-colors text-primary"
                            aria-label="Next Day"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-4 text-center">
                    <p className="text-green-400/80 text-sm mb-4">
                        No major Bitcoin events recorded for {formatDate(selectedDate)}.
                    </p>
                    {!isToday(selectedDate) && (
                        <button
                            onClick={handleBackToToday}
                            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded border border-primary/30 transition-colors"
                        >
                            Back to Today
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const event = relevantEvents[currentIndex];
    const yearsAgo = selectedDate.getFullYear() - event.year; // Use selectedDate year for calculation approximation, but better to use current year
    const actualYearsAgo = new Date().getFullYear() - event.year;

    return (
        <div className="bg-black/50 border border-primary/30 p-6 rounded-lg relative overflow-hidden transition-all duration-500">
            <div className={`absolute top-0 left-0 w-1 h-full ${event.significance === 'high' ? 'bg-primary' :
                event.significance === 'medium' ? 'bg-green-400' :
                    'bg-green-400/50'
                }`}></div>

            {/* Progress Bar for 21s timer */}
            {relevantEvents.length > 1 && (
                <div className="absolute top-0 left-0 h-1 bg-primary/30 w-full">
                    <div
                        key={currentIndex}
                        className="h-full bg-primary animate-[progress_21s_linear]"
                    ></div>
                </div>
            )}

            {/* Navigation Controls - Absolute Positioned Top Right */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                    onClick={handlePrevDay}
                    className="p-1 hover:bg-black/60 bg-black/20 rounded-full transition-colors text-primary border border-primary/20"
                    aria-label="Previous Day"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs text-green-400/80 font-mono font-bold bg-black/40 px-2 py-0.5 rounded border border-primary/10">
                        {formatDate(selectedDate)}
                    </span>
                    {!isToday(selectedDate) && (
                        <button
                            onClick={handleBackToToday}
                            className="text-[10px] text-primary hover:text-green-300 transition-colors mt-0.5"
                        >
                            Back to Today
                        </button>
                    )}
                </div>

                <button
                    onClick={handleNextDay}
                    className="p-1 hover:bg-black/60 bg-black/20 rounded-full transition-colors text-primary border border-primary/20"
                    aria-label="Next Day"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 mt-2">
                <div className="p-4 bg-primary/10 rounded-full border border-primary/30 shrink-0">
                    {event.significance === 'high' ? (
                        <Zap className="h-8 w-8 text-primary" />
                    ) : (
                        <Calendar className="h-8 w-8 text-primary" />
                    )}
                </div>

                <div className="flex-1 pr-24"> {/* Added padding right to avoid overlap with nav */}
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xs text-green-400/60 font-bold">
                            ON THIS DAY IN BITCOIN HISTORY
                        </h2>
                        {event.significance === 'high' && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                MILESTONE
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {event.title}
                    </h3>

                    <p className="text-green-400/80 text-sm mb-3 leading-relaxed">
                        {event.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="text-primary font-bold">
                                {event.year}
                            </span>
                            <span className="text-green-400/60">
                                ({actualYearsAgo} year{actualYearsAgo !== 1 ? 's' : ''} ago)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            {relevantEvents.length > 1 && (
                <div className="absolute bottom-2 right-4 flex gap-1">
                    {relevantEvents.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-primary/20'
                                }`}
                        />
                    ))}
                </div>
            )}

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
