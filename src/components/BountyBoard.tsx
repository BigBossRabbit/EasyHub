import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Target, Bitcoin, Terminal, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface BountyPlatform {
    name: string;
    url: string;
    description: string;
    tags: string[];
    topBounty: {
        title: string;
        amount: string;
        tags?: string[];
    };
}

export const BOUNTY_DATA = {
    "HackenProof": [
        { title: "Layer 1 Blockchain Critical", amount: "$500,000+", tags: ["Protocol", "Critical"] },
        { title: "DeFi Bridge Vulnerability", amount: "$250,000+", tags: ["Smart Contract", "High"] },
        { title: "Exchange Wallet Exploit", amount: "$100,000+", tags: ["Wallet", "Critical"] },
        { title: "ZK-Rollup Logic Error", amount: "$75,000+", tags: ["L2", "High"] }
    ],
    "Bitcoin Bounties": [
        { title: "Web UI for JoinMarket", amount: "0.5 BTC", tags: ["UI/UX", "Privacy"] },
        { title: "Core Lightning Plugin", amount: "0.5 BTC", tags: ["Lightning", "Dev"] },
        { title: "Silent Payments Implementation", amount: "0.4 BTC", tags: ["Protocol", "Privacy"] },
        { title: "Stratum V2 Template Provider", amount: "0.3 BTC", tags: ["Mining", "Rust"] }
    ],
    "Bitaps": [
        { title: "Zero Day Exploit", amount: "2.0 BTC", tags: ["Critical", "Exploit"] },
        { title: "Double Spend Vector", amount: "1.5 BTC", tags: ["Consensus", "High"] },
        { title: "Mempool DoS Attack", amount: "0.8 BTC", tags: ["Network", "Medium"] }
    ],
    "Geyser Fund": [
        { title: "WallAxe: Mining Revolution", amount: "1.5 BTC", tags: ["Hardware", "Mining"] },
        { title: "Bitcoin Standard in Parliament", amount: "0.8 BTC", tags: ["Education", "Policy"] },
        { title: "Nostr Relay Implementation", amount: "0.5 BTC", tags: ["Nostr", "Dev"] },
        { title: "Free Open Source Education", amount: "0.3 BTC", tags: ["Education", "Content"] }
    ]
};

export const BOUNTY_PLATFORMS: BountyPlatform[] = [
    {
        name: "Lightning Bounties",
        url: "https://lightningbounties.com",
        description: "Earn sats by solving issues on Lightning Network repositories.",
        tags: ["Lightning", "Dev", "Sats"],
        topBounty: {
            title: "LND: Add support for new TLV records",
            amount: "500,000 sats"
        }
    },
    {
        name: "HackenProof",
        url: "https://hackenproof.com/programs?type=bug-bounty",
        description: "Web3 bug bounty platform with active crypto programs.",
        tags: ["Security", "DeFi", "Web3"],
        topBounty: {
            title: "Critical Smart Contract Bug",
            amount: "$50,000+"
        }
    },
    {
        name: "Immunefi",
        url: "https://immunefi.com/explore/",
        description: "Leading bug bounty platform for DeFi and crypto projects.",
        tags: ["Security", "DeFi", "High Rewards"],
        topBounty: {
            title: "Protocol Logic Error",
            amount: "$1,000,000+"
        }
    },
    {
        name: "Strike",
        url: "https://strike.me/legal/bug-bounty/",
        description: "Report security vulnerabilities in Strike's infrastructure.",
        tags: ["Security", "App", "Infrastructure"],
        topBounty: {
            title: "Critical API Vulnerability",
            amount: "Variable"
        }
    },
    {
        name: "Geyser Fund",
        url: "https://geyser.fund",
        description: "Crowdfunding for Bitcoin creators and builders.",
        tags: ["Crowdfunding", "Grants", "Community"],
        topBounty: {
            title: "Bitcoin Education Hub",
            amount: "0.5 BTC"
        }
    },
    {
        name: "Swan Bitcoin",
        url: "https://www.swanbitcoin.com/security/",
        description: "Responsible disclosure program for Swan Bitcoin.",
        tags: ["Security", "Exchange", "Web"],
        topBounty: {
            title: "Remote Code Execution",
            amount: "Variable"
        }
    },
    {
        name: "Bolt.fun",
        url: "https://bolt.fun/tournaments",
        description: "Hackathons and tournaments for building on Bitcoin.",
        tags: ["Hackathon", "Lightning", "Dev"],
        topBounty: {
            title: "Legends of Lightning Winner",
            amount: "1.0 BTC"
        }
    },
    {
        name: "Cash App",
        url: "https://hackerone.com/cashapp",
        description: "Bug bounty program for Cash App via HackerOne.",
        tags: ["Security", "Mobile", "Payments"],
        topBounty: {
            title: "Critical Payment Bypass",
            amount: "$5,000+"
        }
    },
    {
        name: "Kraken",
        url: "https://hackerone.com/kraken",
        description: "Security bug bounty for Kraken Exchange.",
        tags: ["Security", "Exchange", "High Rewards"],
        topBounty: {
            title: "Trading Engine Exploit",
            amount: "$100,000+"
        }
    },
    {
        name: "Bitfinex",
        url: "https://www.bitfinex.com/legal/bug-bounty/",
        description: "Bug bounty program for Bitfinex exchange.",
        tags: ["Security", "Exchange", "Trading"],
        topBounty: {
            title: "Critical Platform Vulnerability",
            amount: "$10,000+"
        }
    }
];

interface BountyBoardProps {
    platforms: BountyPlatform[];
    checkingIndex: number | null;
    lastChecked: Date;
}

export const BountyBoard = ({ platforms, checkingIndex, lastChecked }: BountyBoardProps) => {


    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:border-orange-500 transition-colors relative overflow-hidden h-full flex flex-col">
            {/* Techy Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-500/20 to-transparent"></div>
                <div className="absolute top-6 left-6 w-12 h-12 border border-orange-500/20 rounded-full"></div>
                <div className="absolute bottom-6 right-6 w-6 h-6 border border-orange-500/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-orange-500/10 rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Target className="h-8 w-8 text-orange-500" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className="text-xs text-muted-foreground font-mono">OPPORTUNITIES</span>
                            <div className="flex items-center gap-1 text-xs text-orange-500 font-mono">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span>LIVE FEED</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground font-mono block">LAST SCAN</span>
                        <span className="text-xs text-orange-500 font-mono">{lastChecked.toLocaleTimeString()}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 font-mono">Bitcoin Bounties & Grants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Earn Bitcoin by contributing to open source projects, finding bugs, or securing grants for your own ideas.
                </p>

                <div className="grid md:grid-cols-2 gap-4 flex-grow">
                    {platforms.map((platform, index) => (
                        <div key={index} className="group border border-orange-500/10 rounded-lg p-3 relative hover:border-orange-500/30 transition-colors bg-black/20">
                            {/* Scanning effect overlay */}
                            {checkingIndex === index && (
                                <div className="absolute inset-0 bg-orange-500/5 animate-pulse rounded-lg z-0"></div>
                            )}

                            <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block space-y-2 relative z-10 h-full flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-foreground group-hover:text-orange-400 transition-colors font-mono text-sm flex items-center gap-2 truncate">
                                        {platform.name}
                                        {checkingIndex === index && (
                                            <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
                                        )}
                                    </h3>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-orange-400 flex-shrink-0" />
                                </div>

                                <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 flex-grow">
                                    {platform.description}
                                </p>

                                {/* Highest Bounty Display */}
                                <div className="bg-black/40 border border-orange-500/20 rounded p-2 mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="h-3 w-3 text-orange-500/70" />
                                        <span className="text-[10px] text-orange-500/70 font-mono">TOP:</span>
                                    </div>
                                    <div className="text-right overflow-hidden">
                                        <div className="text-[10px] text-gray-300 font-mono truncate max-w-[80px]">{platform.topBounty.title}</div>
                                        <div className="text-xs font-bold text-orange-400 font-mono">{platform.topBounty.amount}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mt-2">
                                    {(platform.topBounty.tags || platform.tags).slice(0, 2).map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-[9px] px-1 py-0 h-4 border-orange-500/30 text-orange-400 bg-orange-500/5 font-mono">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {(platform.topBounty.tags || platform.tags).length > 2 && (
                                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-orange-500/30 text-orange-400 bg-orange-500/5 font-mono">
                                            +{(platform.topBounty.tags || platform.tags).length - 2}
                                        </Badge>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Terminal Status */}
                <div className="mt-6 p-2 bg-black/50 rounded font-mono text-xs">
                    <div className="text-orange-400 mb-1">
                        <span className="text-primary">$</span> bounties --monitor --active
                    </div>
                    <div className="text-orange-400 flex items-center gap-2">
                        <Bitcoin className="h-3 w-3" />
                        <span>Rewards payable in BTC/Sats</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

