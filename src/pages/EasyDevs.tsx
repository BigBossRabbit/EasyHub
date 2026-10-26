import { Button } from "@/components/ui/button";
import { Terminal, Code2, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BountyBoard } from "@/components/BountyBoard";
import { SovereignKey } from "@/components/SovereignKey";

const RESOURCES = [
  {
    name: "Bitcoin Core",
    url: "https://github.com/bitcoin/bitcoin",
    blurb: "The reference implementation. Good first issues labelled on GitHub.",
    tags: ["C++", "Consensus"]
  },
  {
    name: "Lightning (BOLTs)",
    url: "https://github.com/lightning/bolts",
    blurb: "The Lightning Network protocol specification. Propose, review, implement.",
    tags: ["Spec", "Protocol"]
  },
  {
    name: " developer.bitcoin.org",
    url: "https://developer.bitcoin.org/",
    blurb: "Official Bitcoin developer documentation and reference.",
    tags: ["Docs", "Reference"]
  },
  {
    name: "Btrust",
    url: "https://btrust.tech/",
    blurb: "Funding Bitcoin open-source development and developer education in the Global South.",
    tags: ["Career", "Mentorship"]
  },
  {
    name: "Chaincode Labs",
    url: "https://chaincode.com/",
    blurb: "Residency programs and free open-source curriculum for Bitcoin devs.",
    tags: ["Residency", "Learning"]
  },
  {
    name: "Bitcoin Design Guide",
    url: "https://bitcoin.design/guide/",
    blurb: "Open-source guide for designing Bitcoin products. Designers welcome.",
    tags: ["Design", "UX"]
  }
];

const EasyDevs = () => {
  return (
    <div className="min-h-screen text-foreground font-mono">
      <Seo title="EasyDevs — Open Source Opportunities" description="Live open-source bounties, grants and learning paths in the Bitcoin & freedom technology space." canonical="/easydevs" />

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl">
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="text-primary">$</span>
              <span className="animate-pulse">loading_open_source_opportunities...</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-primary">&gt;</span> EasyDevs
              <br />
              <span className="text-primary">&gt;</span> Open Source
              <br />
              <span className="text-primary">&gt;</span> Opportunities
            </h1>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4 mb-6">
            <div className="flex items-center gap-2 text-primary">
              <Code2 className="h-5 w-5" />
              <span className="font-semibold">// About EasyDevs</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Bitcoin is built in the open — and it pays. This page tracks <span className="text-foreground font-semibold">live, claimable bounties</span> on
              real GitHub issues across Bitcoin, Lightning and Nostr repos, plus the platforms, grants and learning paths that
              turn contributors into maintainers. No registrations, no gatekeeping: read the issue, ship the fix, post the PR.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-8">
        {/* Live Bounties — full width */}
        <BountyBoard />
      </section>

      <section className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-sm mb-2">
            <Terminal className="h-4 w-4" />
            <span>cat resources.json</span>
          </div>
          <h2 className="text-3xl font-bold">Start Contributing</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESOURCES.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors block"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold font-mono text-sm group-hover:text-primary transition-colors">{r.name}</h3>
                <LinkIcon className="h-3 w-3 text-muted-foreground group-hover:text-primary flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.blurb}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {r.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded font-mono">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* SovereignKey Project */}
          <SovereignKey />
        </div>

        <div className="mt-8 bg-card border border-primary/50 rounded-lg p-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Terminal className="h-5 w-5" />
            <span className="font-semibold">// Want to submit a project?</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Building an open source Bitcoin or freedom tech project? Reach us directly — we feature selected projects here.
          </p>
          <Button className="gap-2" asChild>
            <Link to="/connect">
              <Code2 className="h-4 w-4" />
              Submit Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EasyDevs;
