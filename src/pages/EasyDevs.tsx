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
    <div className="min-h-screen text-foreground">
      <Seo title="EasyDevs — Open Source Opportunities" description="Live open-source bounties, grants and learning paths in the Bitcoin & freedom technology space." canonical="/easydevs" />

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 space-y-6">
            <div className="leaf-kicker">EasyDevs · Build in the open</div>
            <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold">
              Bitcoin is built in the open.<br /><em>So is your résumé.</em>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Live, unclaimed issues on real Bitcoin, Lightning and Nostr projects. No sign-up, no gatekeeping:
            read the issue, ship the fix, open the PR. That's how maintainers find their next hire.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#open-work" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(232,134,45,.35)]">See open issues</a>
            <a href="#start" className="inline-flex items-center rounded-full border border-border px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] hover:border-gold hover:text-gold transition-colors">New to open source?</a>
          </div>
        </div>
      </section>

      <section id="open-work" className="container mx-auto px-6 pb-8 ">
        {/* Live Bounties — full width */}
        <BountyBoard />
      </section>

      <section id="start" className="container mx-auto px-6 py-16 ">
        <div className="mb-10 text-center">
          <div className="leaf-kicker mb-3">Where the work lives</div>
          <h2 className="text-3xl md:text-4xl font-semibold">Start <em>contributing.</em></h2>
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
