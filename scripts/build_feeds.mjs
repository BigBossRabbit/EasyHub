// Builds public/feeds.json — the site's single same-origin data file.
// Replaces client-side calls to dead proxies (allorigins, rss2json).
// Sources: Stacker News (jobs + RSS news), GitHub bounty issues, HRF careers page.
// Run: node scripts/build_feeds.mjs   (or via .github/workflows/feeds.yml every 6h)
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" };
const j = (r) => r.json();

async function fetchOK(url, opts = {}, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...opts, headers: { ...UA, ...(opts.headers || {}) }, signal: AbortSignal.timeout(25000) });
      if (r.ok) return r;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  return null;
}

const slugTitle = (s) =>
  s.split("-").map((w) => w.toUpperCase() === "MENA" ? "MENA" : w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/-/g, " ");

async function snJobs() {
  const r = await fetchOK("https://stacker.news/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: `{ items(sub:"jobs", sort:"recent", type:"adds", limit:12) { items { id title createdAt } } }` }),
  });
  if (!r) return [];
  try {
    const { data } = await j(r);
    return data.items.items.map((it) => ({ id: it.id, title: it.title, url: `https://stacker.news/items/${it.id}`, date: it.createdAt }));
  } catch { return []; }
}

async function snNews() {
  const r = await fetchOK("https://stacker.news/rss");
  if (!r) return [];
  try {
    const xml = await r.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 10).map((m) => {
      const pick = (t) => { const x = m[1].match(new RegExp(`<${t}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${t}>`)) || m[1].match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return x ? x[1].trim() : ""; };
      return { title: pick("title"), link: pick("link"), pubDate: pick("pubDate"), description: pick("description").replace(/<[^>]+>/g, "").slice(0, 220) };
    }).filter((n) => n.title && n.link);
  } catch { return []; }
}

// Only real Bitcoin/Lightning/Nostr projects. The open GitHub search for "label:bounty bitcoin"
// is dominated by bot farms (bounty-plaza, bounty-bot, radar spam) — an allowlist is the only honest feed.
const BTC_ORGS = ["btcpayserver", "getAlby", "cashubtc", "lnbits", "bitcoindevkit", "lightningdevkit",
  "mempool", "fedimint", "ElementsProject", "BlueWallet", "breez", "stackernews", "nostr-protocol", "vexl-world"];

async function ghIssues(label, perPage) {
  const orgs = BTC_ORGS.map((o) => `org:${o}`).join(" ");
  const q = encodeURIComponent(`state:open type:issue no:assignee label:"${label}" ${orgs}`);
  const r = await fetchOK(`https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=${perPage}`,
    process.env.GITHUB_TOKEN ? { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } } : {});
  if (!r) return [];
  try { const { items = [] } = await j(r); return items; } catch { return []; }
}

async function ghBounties() {
  const paid = await ghIssues("bounty", 12);
  const starter = paid.length >= 6 ? [] : await ghIssues("good first issue", 60);
  const seen = {};
  return [...paid.map((it) => [it, "bounty"]), ...starter.map((it) => [it, "first issue"])].map(([it, kind]) => {
    const amt = kind === "bounty" ? it.title.match(/(\d[\d,.]*\s?(?:k\+?\s?)?(?:sats?|sat\b|usd\b|\$[\d,]+))/i) : null;
    return {
      id: it.id, title: it.title, url: it.html_url, kind,
      repo: it.repository_url.split("/").slice(-2).join("/"),
      labels: [kind === "bounty" ? "paid bounty" : "good first issue", ...(it.labels || []).map((l) => l.name).filter((n) => !/good first issue|bounty/i.test(n))].slice(0, 3),
      amount: amt ? amt[1].trim() : null,
      createdAt: it.created_at,
    };
  }).filter((b) => { const org = b.repo.split("/")[0]; seen[org] = (seen[org] || 0) + 1; return seen[org] <= 2; }).slice(0, 10);
}

async function hrfJobs() {
  const r = await fetchOK("https://hrf.org/work/");
  if (!r) return { ok: false, jobs: [] };
  try {
    const html = await r.text();
    const seen = new Set();
    const jobs = [...html.matchAll(/href="https:\/\/hrf\.org\/career\/([a-z0-9-]+)\/"/g)]
      .map((m) => m[1]).filter((s) => !seen.has(s) && seen.add(s))
      .map((slug) => ({ title: slugTitle(slug), url: `https://hrf.org/career/${slug}/` }));
    return { ok: jobs.length > 0, jobs };
  } catch { return { ok: false, jobs: [] }; }
}

const out = {
  generatedAt: new Date().toISOString(),
  jobs: { stackerNews: await snJobs(), hrf: await hrfJobs() },
  bounties: await ghBounties(),
  news: await snNews(),
};

const fs = await import("node:fs");
fs.mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../public/feeds.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(`feeds.json written: snJobs=${out.jobs.stackerNews.length} hrf=${out.jobs.hrf.jobs.length} bounties=${out.bounties.length} news=${out.news.length}`);
