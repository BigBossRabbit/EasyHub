import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Target, Bitcoin, Terminal, RefreshCw } from 'lucide-react';

interface Bounty {
    id: number;
    title: string;
    url: string;
    repo: string;
    labels: string[];
    amount: string | null;
    createdAt: string;
}

interface FeedData {
    generatedAt: string;
    bounties: Bounty[];
}

const PLATFORMS = [
    {
        name: "Lightning Bounties",
        url: "https://app.lightningbounties.com/feed",
        description: "Sats paid over Lightning for closed GitHub issues.",
    },
    {
        name: "Stacker News ~jobs",
        url: "https://stacker.news/~jobs",
        description: "Bounties and paid gigs posted by the SN community.",
    },
    {
        name: "Kraken Bug Bounty",
        url: "https://www.kraken.com/features/security/bug-bounty",
        description: "Security reports paid in BTC to verified accounts.",
    },
];

const STALE_MS = 72 * 60 * 60 * 1000;

export const BountyBoard = () => {
    const [bounties, setBounties] = useState<Bounty[]>([]);
    const [generatedAt, setGeneratedAt] = useState<string | null>(null);
    const [state, setState] = useState<'loading' | 'ready' | 'empty' | 'stale'>('loading');

    const load = async () => {
        setState('loading');
        try {
            const res = await fetch('/feeds.json');
            if (!res.ok) throw new Error(`feeds.json ${res.status}`);
            const data: FeedData = await res.json();
            setBounties(data.bounties || []);
            setGeneratedAt(data.generatedAt ? new Date(data.generatedAt).toLocaleString() : null);
            const age = Date.now() - new Date(data.generatedAt).getTime();
            if (age > STALE_MS) setState('stale');
            else if ((data.bounties || []).length > 0) setState('ready');
            else setState('empty');
        } catch {
            setState('stale');
        }
    };

    useEffect(() => { load(); }, []);

    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:border-orange-500 transition-colors relative overflow-hidden h-full flex flex-col">
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
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className="text-xs text-muted-foreground font-mono">OPPORTUNITIES</span>
                            <div className="flex items-center gap-1 text-xs text-green-500 font-mono">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>LIVE BOUNTIES</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground font-mono block">SYNCED</span>
                        <span className="text-xs text-orange-500 font-mono">{generatedAt || '—'}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 font-mono">Open Source Bounties — Live</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Real, open GitHub issues with a bounty label, across Bitcoin and Lightning repos. Claim one, ship the fix, get paid.
                </p>

                {state === 'loading' && (
                    <div className="p-2 bg-black/50 rounded font-mono text-xs text-orange-400 flex items-center gap-2">
                        <RefreshCw className="h-3 w-3 animate-spin" /> fetching bounties...
                    </div>
                )}

                {(state === 'ready') && (
                    <div className="space-y-2 mb-6 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                        {bounties.map((b) => (
                            <a
                                key={b.id}
                                href={b.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block border border-orange-500/10 rounded-lg p-3 hover:border-orange-500/40 transition-colors bg-black/20"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-sm font-mono text-foreground group-hover:text-orange-400 transition-colors line-clamp-2">
                                            {b.title}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground font-mono mt-1">
                                            {b.repo} · {new Date(b.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                        {b.amount && (
                                            <span className="text-xs font-bold text-orange-400 font-mono whitespace-nowrap">{b.amount}</span>
                                        )}
                                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-orange-400" />
                                    </div>
                                </div>
                                {b.labels.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {b.labels.slice(0, 3).map((l, i) => (
                                            <Badge key={i} variant="outline" className="text-[9px] px-1 py-0 h-4 border-orange-500/30 text-orange-400 bg-orange-500/5 font-mono">
                                                {l}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>
                )}

                {state === 'empty' && (
                    <div className="p-3 bg-black/40 border border-orange-500/20 rounded font-mono text-xs text-muted-foreground mb-6">
                        No open bounty-labelled issues matched right now. The boards below always carry live work:
                    </div>
                )}

                {state === 'stale' && (
                    <div className="p-3 bg-black/40 border border-yellow-500/30 rounded font-mono text-xs text-yellow-400/80 mb-6">
                        Bounty feed is temporarily unavailable. The boards below always carry live work:
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-4 mt-auto">
                    {PLATFORMS.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border border-orange-500/10 rounded-lg p-3 hover:border-orange-500/30 transition-colors bg-black/20 block"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-foreground group-hover:text-orange-400 transition-colors font-mono text-sm flex items-center gap-2 truncate">
                                    {platform.name}
                                </h4>
                                <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-orange-400 flex-shrink-0" />
                            </div>
                            <p className="text-[10px] text-muted-foreground line-clamp-2">{platform.description}</p>
                        </a>
                    ))}
                </div>

                <div className="mt-6 p-2 bg-black/50 rounded font-mono text-xs">
                    <div className="text-orange-400 mb-1">
                        <span className="text-primary">$</span> bounties --monitor --active
                    </div>
                    <div className="text-orange-400 flex items-center gap-2">
                        <Bitcoin className="h-3 w-3" />
                        <span>Rewards payable in BTC/Sats · feed refreshes every 6h</span>
                    </div>
                    <div className="text-orange-400/60 mt-1 flex items-center gap-2">
                        <Terminal className="h-3 w-3" />
                        <span>source: GitHub bounty-labelled issues · bitcoin · lightning · nostr</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
