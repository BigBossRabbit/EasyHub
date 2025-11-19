import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  description: string;
  category: string;
  itemId: string;
  sourceDomain: string;
  discussionLink: string;
}

export const StackerNewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const getFirstTwoSentences = (text: string) => {
    if (!text) return '';
    // Remove markdown and HTML
    const cleanText = text.replace(/[#*_`\[\]()]/g, '').replace(/<[^>]*>?/gm, '');
    // Split by sentence endings
    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    // Take first 2 and join
    return sentences.slice(0, 2).join(' ').trim();
  };

  const fetchNews = async (isAutoRefresh = false) => {
    if (!isAutoRefresh) setLoading(true);
    // Don't clear error on auto-refresh to avoid flickering if it fails silently
    if (!isAutoRefresh) setError(null);

    try {
      // Use RSS feed with rss2json (GraphQL has CORS issues)
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://stacker.news/rss');

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      if (data.status !== 'ok') throw new Error('Feed fetch failed');

      const newsItems: NewsItem[] = data.items.slice(0, 5).map((item: any, index: number) => {
        // Extract description from the content or use a fallback
        const description = item.description ?
          getFirstTwoSentences(item.description.replace(/<[^>]*>/g, '').replace('Comments', '')) :
          '';

        // Extract category from categories array
        const category = item.categories && item.categories.length > 0 ?
          item.categories[0] : 'bitcoin';

        // Extract item ID from GUID (e.g., "https://stacker.news/items/1286449" -> "1286449")
        const itemId = item.guid ? item.guid.split('/').pop() : '';

        // Extract source domain from link (e.g., "https://github.com/path" -> "github.com")
        let sourceDomain = 'stacker.news';
        try {
          const url = new URL(item.link);
          sourceDomain = url.hostname.replace('www.', '');
        } catch (e) {
          // If link parsing fails, use stacker.news
        }

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          creator: item.author || 'anon',
          description: description || '',
          category: category,
          itemId: itemId,
          sourceDomain: sourceDomain,
          discussionLink: `https://stacker.news/items/${itemId}`
        };
      });

      setNews(newsItems);
      setLastUpdated(new Date());
      setError(null); // Clear error on success
    } catch (err) {
      console.error("Error fetching Stacker News:", err);
      // Only show visible error if it's a manual fetch or initial load
      if (!isAutoRefresh) {
        setError("Failed to load news feed. Retrying automatically...");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Auto-refresh every 3 minutes
    const intervalId = setInterval(() => {
      fetchNews(true);
    }, 3 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <Card className="w-full h-full bg-black/40 border-yellow-500/20 backdrop-blur-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
        <CardTitle className="text-xl font-bold text-yellow-500 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          Stacker News
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-yellow-500/50 font-mono hidden sm:inline-block">
            UPDATED: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fetchNews(false)}
            disabled={loading}
            className="text-yellow-500/70 hover:text-yellow-400 hover:bg-yellow-500/10 h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-grow custom-scrollbar">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-red-400 space-y-2">
            <span className="text-sm text-center">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchNews(false)}
              className="border-red-500/30 hover:bg-red-500/10 text-red-400"
            >
              Retry Now
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {loading && news.length === 0 ? (
              // Skeleton loading - only show if no data
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-4 bg-yellow-500/10 rounded w-3/4"></div>
                  <div className="h-3 bg-yellow-500/5 rounded w-1/2"></div>
                  <div className="h-3 bg-yellow-500/5 rounded w-full"></div>
                </div>
              ))
            ) : (
              news.map((item, index) => (
                <div key={index} className="group border-b border-yellow-500/10 last:border-0 pb-3 last:pb-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-yellow-500/5 p-3 rounded-lg transition-all duration-300 -mx-3 hover:scale-[1.02] hover:border-yellow-500/30 border border-transparent"
                  >
                    {/* Animated accent bar */}
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 mb-2"></div>

                    <h3 className="font-medium text-gray-200 group-hover:text-yellow-400 transition-colors line-clamp-2 text-sm leading-snug mb-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>
                    )}

                    {/* Single consolidated metadata line */}
                    <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono">
                      <span className="text-blue-400/70 group-hover:text-blue-400 transition-colors">{item.sourceDomain}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 group-hover:text-gray-400 transition-colors">#{item.itemId}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-yellow-500/60 group-hover:text-yellow-500 transition-colors">@{item.creator}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{getTimeAgo(item.pubDate)}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-orange-400 group-hover:text-orange-300 transition-colors">{item.category}</span>
                      <span className="text-gray-600 mx-1">•</span>
                      <a
                        href={item.discussionLink}
                        onClick={(e) => e.stopPropagation()}
                        className="text-yellow-400/70 hover:text-yellow-400 transition-colors inline-flex items-center gap-1 group/discuss"
                      >
                        <span className="group-hover/discuss:underline">discuss</span>
                        <ExternalLink className="h-3 w-3 group-hover/discuss:translate-x-0.5 transition-transform" />
                      </a>
                      <span className="text-gray-600 ml-auto hidden sm:inline">
                        {new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
