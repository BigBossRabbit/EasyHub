import React, { useEffect, useState } from 'react';
import { Briefcase, ExternalLink } from "lucide-react";


interface Job {
  title: string;
  link: string;
  location: string;
  type: string;
  published: string;
}

const HrfJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const cachedData = localStorage.getItem('hrfJobs');
      const cachedTimestamp = localStorage.getItem('hrfJobsTimestamp');

      if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp, 10)) < 24 * 60 * 60 * 1000) {
        setJobs(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api.allorigins.win/raw?url=https://hrf.org/work/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const jobArticles = doc.querySelectorAll('article.career.type-career');
        const extractedJobs: Job[] = [];

        jobArticles.forEach(article => {
          const titleElement = article.querySelector('h3.elementor-heading-title');
          const linkElement = article.querySelector('a.elementor-button.elementor-button-link');
          const detailsElements = article.querySelectorAll('ul.elementor-icon-list-items.elementor-inline-items li .elementor-icon-list-text');

          const title = titleElement?.textContent?.trim() || 'N/A';
          const link = linkElement?.getAttribute('href') || '#';

          let location = 'N/A';
          let type = 'N/A';
          let published = 'N/A';

          detailsElements.forEach(detail => {
            const text = detail.textContent?.trim();
            if (text) {
              if (text.toLowerCase().includes('full-time') || text.toLowerCase().includes('part-time')) {
                type = text;
              } else if (text.toLowerCase().includes('new york, ny') || text.toLowerCase().includes('remote') || text.toLowerCase().includes('u.s.-based')) {
                location = text;
              } else if (text.toLowerCase().includes('published on')) {
                published = text;
              }
            }
          });
          
          extractedJobs.push({ title, link, location, type, published });
        });

        setJobs(extractedJobs);
        localStorage.setItem('hrfJobs', JSON.stringify(extractedJobs));
        localStorage.setItem('hrfJobsTimestamp', Date.now().toString());
      } catch (e: unknown) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError(String(e));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="bg-background border border-border rounded-lg p-6 text-center text-white">Loading HRF Jobs...</div>;
  if (error) return <div className="bg-background border border-red-500 rounded-lg p-6 text-center text-red-500">Error loading HRF Jobs: {error}</div>;

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">HRF Work - Live Opportunities</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Opportunities to defend human rights globally
        </p>

        {/* HRF Branding */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-xs font-medium text-primary">Powered by Human Rights Foundation</span>
          </div>
          <div className="text-xs text-muted-foreground">
            External
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                External
            </div>
        </div>
        <div className="space-y-4 h-[600px] overflow-y-auto border border-border rounded-lg p-4 bg-background">
            {jobs.map((job, index) => (
            <div key={index} className="bg-zinc-800/50 p-4 rounded-md shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                    <span className="mr-2">{job.type}</span>
                    <span className="mr-2">{job.location}</span>
                    <br />
                    <span>{job.published}</span>
                </p>
                </div>
                <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                Apply <ExternalLink className="ml-1 h-4 w-4 inline-block" />
                </a>
            </div>
            ))}
        </div>
      </div>

      <div className="mt-6 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Having trouble viewing jobs?
        </p>
        <a
            href="https://hrf.org/work/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-input bg-transparent rounded-md font-semibold text-sm text-primary hover:bg-accent hover:text-accent-foreground"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open HRF Website
        </a>
      </div>
    </div>
  );
};

export default HrfJobs;
