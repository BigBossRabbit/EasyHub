import { Button } from "@/components/ui/button";
import { FileText, Scale, Shield, ChevronRight, RotateCcw, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { StackerNewsFeed } from "@/components/StackerNewsFeed";
import { Classifieds } from "@/components/Classifieds";
import { useBitcoinAfricaNews } from "@/hooks/useBitcoinAfricaNews";

const INSIGHTS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "EasySats Chronicle",
  "description": "The EasySats Chronicle: Namibia's First Bitcoin Revolution and community news."
});

const BLOCKHEIGHT = 736253;

const Insights = () => {
  const {
    featuredStory,
    topStories,
    currentIndex,
    totalStories,
    quickFacts,
    lastUpdated,
    nextArticle,
    goToFirst
  } = useBitcoinAfricaNews();

  return (
    <div className="min-h-screen text-foreground">
      <Seo
        title="EasySats Chronicle | Bitcoin Africa News"
        description="The EasySats Chronicle: Bitcoin news, African Bitcoiners, circular economies, and the latest from conferences like Adopting Bitcoin."
        image="/easysats-logo.png"
        type="website"
        schema={INSIGHTS_SCHEMA}
      />
      <header className="py-12 text-center border-b border-white/10 mb-12">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img src="/easysats-logo.png" alt="EasySats" className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              THE EASYSATS <span className="text-primary">CHRONICLE</span>
            </h1>
            <p className="text-sm text-muted-foreground font-mono tracking-[0.3em] uppercase">
              Building Tomorrow, Today • EST.{" "}
              <a
                href={`https://mempool.space/block/${BLOCKHEIGHT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Blockheight {BLOCKHEIGHT.toLocaleString()}
              </a>
            </p>
          </div>
        </div>
      </header>

        {/* Africa Bitcoin Day 2026 Pool Tournament */}        <section className="mb-12">          <div className="container mx-auto px-6">            <div className="space-y-6">              <div className="flex items-center justify-between mb-4">                <h2 className="text-3xl font-bold text-primary">                  🏆 Africa Bitcoin Day 2026 Pool Tournament                </h2>                <a href="/abd2026_pool_tournament_thank_you.txt"                   className="btn btn-primary btn-sm"                   target="_blank"                   rel="noopener noreferrer">                  View Thank You Note                </a>              </div>              <div className="grid md:grid-cols-2 gap-6">                <div>                  <h3 className="text-lg font-bold text-yellow-400 mb-2">📊 Tournament Stats</h3>                  <p className="space-y-2 text-sm">                    • <span className="font-medium">Format:</span> Single Elimination Pool Tournament                    <br/>• <span className="font-medium">Participants:</span> 22 players                    <br/>• <span className="font-medium">Date:</span> 23 May 2026                    <br/>• <span className="font-medium">Location:</span> Joker's Pizzeria, Windhoek                    <br/>• <span className="font-medium">Organized by:</span> EasySats & OKIN.Ent                    <br/>• <span className="font-medium">Supported by:</span> African Bitcoin Community Hub                    <br/>• <span className="font-medium">Entry Fee:</span> 50 NAD (donated to prize pool)                    <br/>• <span className="font-medium">Phone Validation:</span> +2648XXXXXX format                  </p>                </div>                <div>                  <h3 className="text-lg font-bold text-yellow-400 mb-2">🎉 Event Highlights</h3>                  <p className="space-y-2 text-sm">                    • <span className="font-medium">Successful completion</span> of all matches                    <br/>• <span className="font-medium">Community engagement</span> with Bitcoin education                    <br/>• <span className="font-medium">Fun and competitive atmosphere</span> at Joker's Pizzeria                    <br/>• <span className="font-medium">All entry fees converted to Bitcoin prizes</span>                    <br/>• <span className="font-medium">Positive feedback</span> from participants and sponsors                  </p>                </div>              </div>            </div>          </div>        </section>      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Featured Story - Auto-updates */}
          <div className="md:col-span-2 space-y-6">
            <div className="border-l-4 border-primary pl-4 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-primary uppercase tracking-widest">Featured Story</p>
                  <span className="text-xs text-muted-foreground">
                    ({currentIndex + 1}/{totalStories})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {currentIndex > 0 && (
                    <button
                      onClick={goToFirst}
                      className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                      title="Back to first article"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="hidden sm:inline">First</span>
                    </button>
                  )}
                  <button
                    onClick={nextArticle}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors font-medium"
                    title="Next article"
                  >
                    <span>Next Article</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 transition-all duration-500">
                {featuredStory.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                  {featuredStory.category || featuredStory.source}
                </span>
                <span>Source: {featuredStory.source}</span>
                <span>• {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 transition-all duration-500 leading-relaxed">
                {featuredStory.description}
              </p>

              {featuredStory.link.startsWith('http') ? (
                <a
                  href={featuredStory.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                >
                  Read more at {featuredStory.source}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <Link
                  to={featuredStory.link}
                  className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                >
                  Learn more
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar: Top Stories + Quick Facts */}
          <div className="space-y-6">
            <div className="bg-card border-2 border-border p-6">
              {/* Top Stories Headlines */}
              <div className="mb-6 pb-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">Top Stories</h3>
                  <span className="text-xs text-muted-foreground animate-pulse">● Live</span>
                </div>
                <ul className="space-y-2">
                  {topStories.map((story, index) => (
                    <li
                      key={index}
                      className={`text-xs leading-tight cursor-pointer hover:text-primary transition-colors ${index === currentIndex ? 'text-primary font-medium' : 'text-muted-foreground'
                        }`}
                      onClick={() => nextArticle()}
                    >
                      <span className="text-primary mr-1">▸</span>
                      {story.title.length > 60 ? story.title.substring(0, 60) + '...' : story.title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Facts */}
              <div>
                <h3 className="text-lg font-bold mb-3">Quick Facts</h3>
                <ul className="space-y-2 text-sm">
                  {quickFacts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-2 transition-all duration-300">
                      <span className="text-primary text-xs mt-1">■</span>
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Classifieds Section */}
        <div className="mt-12">
          <Classifieds />
        </div>

        {/* Stacker News Section - Full Width */}
        <div className="pt-8 border-t border-border/50">
          <h3 className="text-2xl font-bold mb-6">Stacker News Feed</h3>
          <div className="h-[600px] w-full bg-card/50 rounded-lg overflow-hidden border border-border">
            <StackerNewsFeed />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Button size="lg" asChild>
            <a href="/bitcoin-whitepaper.html" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Bitcoin Whitepaper
            </a>
          </Button>

          <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white" asChild>
            <Link to="/terms">
              <Scale className="mr-2 h-4 w-4" />
              Terms & Conditions
            </Link>
          </Button>
          <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white" asChild>
            <Link to="/privacy">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Insights;
