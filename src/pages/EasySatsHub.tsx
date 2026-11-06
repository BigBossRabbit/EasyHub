import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const ORGANIZATION_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EasySats",
  "url": "https://bitcoin.okinent.org",
  "logo": "https://bitcoin.okinent.org/easysats-logo.png",
  "description": "Namibia's First Bitcoin Revolution: Don't Just Buy Bitcoin. Earn It. We provide tools for earning, buying, accepting, and storing Bitcoin.",
  "foundingDate": "2022",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Namibia"
  },
  "sameAs": [
    "https://github.com/BigBossRabbit",
    "https://x.com/easysats_"
  ]
});

const WEBSITE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EasySats",
  "url": "https://bitcoin.okinent.org",
  "description": "Namibia's First Bitcoin Revolution: Don't Just Buy Bitcoin. Earn It.",
  "publisher": {
    "@type": "Organization",
    "name": "EasySats"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://bitcoin.okinent.org/easyjobs?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

const paths = [
  {
    n: "01", to: "/timeforce", name: "TimeForce", line: "Have time? Get paid in sats.",
    copy: "Help local shops start taking Bitcoin. We train you, you onboard them, you earn on every one.",
    cta: "Join TimeForce",
  },
  {
    n: "02", to: "/easyjobs", name: "EasyJobs", line: "Have a skill? Get hired in sats.",
    copy: "Remote roles at companies that pay in Bitcoin, plus open careers at the Human Rights Foundation.",
    cta: "See open roles",
  },
  {
    n: "03", to: "/easydevs", name: "EasyDevs", line: "Can you build? Ship real code.",
    copy: "Live open issues on real Bitcoin projects — BTCPay, Cashu, BDK, Lightning. Your first PR starts here.",
    cta: "Find your first issue",
  },
];

const EasySatsHub = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="EasySats | Don't Just Buy Bitcoin. Earn It."
        description="Namibia's first Bitcoin earning layer. Join TimeForce, find Bitcoin careers on EasyJobs, or ship open-source code on EasyDevs."
        image="/easysats-logo.png"
        type="website"
        schemas={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]}
      />

      {/* ---------- HERO ---------- */}
      <section data-no-reveal className="relative overflow-hidden">
        <div className="container mx-auto px-6 min-h-[calc(100svh-7rem)] flex flex-col items-center justify-center text-center py-16">
          <div className="leaf-kicker mb-8 animate-fade-in-up">EasySats · Windhoek · Namibia</div>
          <h1 className="text-[clamp(2.9rem,9vw,7rem)] max-w-5xl animate-fade-in-up">
            Don't just buy Bitcoin.<br /><em>Earn it.</em>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in-up">
            Three ways to stack sats with what you already have — your time, your skills, your code.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <Link to="/timeforce" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(232,134,45,.35)]">
              Start earning <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/tpok" className="inline-flex items-center rounded-full border border-border px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-gold hover:text-gold">
              Learn first
            </Link>
          </div>
          <a href="#paths" className="mt-16 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground/70 hover:text-primary transition-colors">
            Scroll<span className="block mx-auto mt-3 h-10 w-px bg-gradient-to-b from-gold/70 to-transparent animate-pulse" />
          </a>
        </div>
      </section>

      {/* ---------- THREE PATHS ---------- */}
      <section id="paths" className="container mx-auto px-6 py-24 scroll-mt-28">
        <div className="text-center mb-16">
          <div className="leaf-kicker mb-4">Pick your door</div>
          <h2 className="text-4xl md:text-5xl">One stack. <em>Three ways in.</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden max-w-6xl mx-auto">
          {paths.map((p) => (
            <Link key={p.to} to={p.to} className="leaf-card group bg-card p-9 md:p-10 flex flex-col transition-colors duration-500 hover:bg-[#1A1611]">
              <span className="font-serif italic text-gold/80 text-2xl">{p.n}</span>
              <h3 className="mt-6 text-3xl">{p.name}</h3>
              <p className="mt-2 font-serif italic text-primary text-lg">{p.line}</p>
              <p className="mt-5 text-muted-foreground leading-relaxed flex-1">{p.copy}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-foreground group-hover:text-primary transition-colors">
                {p.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="container mx-auto px-6 py-24">
        <blockquote className="max-w-3xl mx-auto text-center">
          <div className="leaf-kicker mb-6">Why earn instead of buy</div>
          <p className="font-serif text-3xl md:text-[2.6rem] leading-[1.2]">
            Buying Bitcoin moves money you already had. <em>Earning it</em> means you learned something, built something, and nobody can take that part back.
          </p>
        </blockquote>
      </section>

      {/* ---------- LEARN BAND ---------- */}
      <section className="container mx-auto px-6 pb-8">
        <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-gradient-to-br from-card to-[#1A1611] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="leaf-kicker mb-3">New to all of this?</div>
            <h2 className="text-3xl md:text-4xl">Start with <em>The Pursuit of Knowledge.</em></h2>
            <p className="text-muted-foreground mt-3 max-w-lg">Free Trezor Academy sessions, talks from Windhoek, and the courses we'd hand a friend.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/tpok" className="inline-flex justify-center rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] hover:-translate-y-0.5 transition-transform">Start learning</Link>
            <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-full border border-border px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] hover:border-gold hover:text-gold transition-colors">Read the whitepaper</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EasySatsHub;
