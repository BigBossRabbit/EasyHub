import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
}

export const StackerNewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using allorigins.win as a CORS proxy
      const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://stacker.news/rss'));
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      
      const items = xmlDoc.querySelectorAll('item');
      const newsItems: NewsItem[] = [];
      
      items.forEach((item, index) => {
        if (index < 5) { // Limit to 5 items
          newsItems.push({
            title: item.querySelector('title')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            pubDate: item.querySelector('pubDate')?.textContent || '',
            creator: item.querySelector('dc\\:creator')?.textContent || 'Stacker News'
          });
        }
      });
      
      setNews(newsItems);
    } catch (err) {
      console.error("Error fetching Stacker News:", err);
      setError("Failed to load news feed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Card className="w-full h-full bg-black/40 border-yellow-500/20 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-yellow-500 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          Stacker News
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchNews} 
          disabled={loading}
          className="text-yellow-500/70 hover:text-yellow-400 hover:bg-yellow-500/10"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-400 text-sm text-center py-4">{error}</div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              // Skeleton loading
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-4 bg-yellow-500/10 rounded w-3/4"></div>
                  <div className="h-3 bg-yellow-500/5 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              news.map((item, index) => (
                <div key={index} className="group border-b border-yellow-500/10 last:border-0 pb-3 last:pb-0">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block space-y-1 hover:bg-yellow-500/5 p-2 rounded-lg transition-colors -mx-2"
                  >
                    <h3 className="font-medium text-gray-200 group-hover:text-yellow-400 transition-colors line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
