import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Target, Bitcoin } from 'lucide-react';

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
        <Card className="w-full h-full bg-black/40 border-orange-500/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-orange-500 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Bitcoin Bounties & Grants
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {BOUNTY_PLATFORMS.map((platform, index) => (
                        <div key={index} className="group border-b border-orange-500/10 last:border-0 pb-4 last:pb-0">
                            <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block space-y-2 hover:bg-orange-500/5 p-2 rounded-lg transition-colors -mx-2"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-200 group-hover:text-orange-400 transition-colors">
                                        {platform.name}
                                    </h3>
                                    <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-orange-400" />
                                </div>

                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {platform.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {platform.tags.map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-xs border-orange-500/30 text-orange-400 bg-orange-500/5">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </a>
                        </div>
                    ))}

                    <div className="pt-2 mt-2 border-t border-orange-500/10">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 italic">
                            <Bitcoin className="h-3 w-3" />
                            <span>Opportunities updated periodically</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
