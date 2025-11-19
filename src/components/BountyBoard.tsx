import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Target, Bitcoin } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BountyPlatform {
    name: string;
    url: string;
    description: string;
    tags: string[];
}

const BOUNTY_PLATFORMS: BountyPlatform[] = [
    {
        name: "Bitcoin Bounties",
        url: "https://bitcoinbounties.org",
        description: "Collection of open bounties for various Bitcoin projects including Core Lightning and privacy tools.",
        tags: ["Protocol", "Lightning", "Privacy"]
    },
    {
        name: "Bitaps",
        url: "https://bitaps.com/bounty",
        description: "Rewards for finding vulnerabilities in their Forwarding API and Wallet API.",
        tags: ["Security", "API", "Wallet"]
    },
    {
        name: "HackenProof",
        url: "https://hackenproof.com/programs?type=bug-bounty",
        description: "Lists numerous crypto bug bounty programs with substantial payouts.",
        tags: ["Security", "Smart Contracts", "DeFi"]
    },
    {
        name: "Geyser Fund",
        url: "https://geyser.fund",
        description: "Crowdfunding platform for Bitcoin projects where you can find grants and community funding.",
        tags: ["Crowdfunding", "Community", "Grants"]
    }
];

export const BountyBoard = () => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:border-orange-500 transition-colors relative overflow-hidden h-full">
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
                                <span>LIVE</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">GLOBAL</span>
                </div>

                <h3 className="text-lg font-semibold mb-2 font-mono">Bitcoin Bounties & Grants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Earn Bitcoin by contributing to open source projects, finding bugs, or securing grants for your own ideas.
                </p>

                <div className="space-y-4 flex-grow">
                    {BOUNTY_PLATFORMS.map((platform, index) => (
                        <div key={index} className="group border-b border-orange-500/10 last:border-0 pb-4 last:pb-0">
                            <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block space-y-2 hover:bg-orange-500/5 p-2 rounded-lg transition-colors -mx-2"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-foreground group-hover:text-orange-400 transition-colors font-mono text-sm">
                                        {platform.name}
                                    </h3>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-orange-400" />
                                </div>

                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {platform.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {platform.tags.map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] border-orange-500/30 text-orange-400 bg-orange-500/5 font-mono">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Terminal Status */}
                <div className="mt-6 p-2 bg-black/50 rounded font-mono text-xs">
                    <div className="text-orange-400 mb-1">
                        <span className="text-primary">$</span> bounties --check-rewards
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
