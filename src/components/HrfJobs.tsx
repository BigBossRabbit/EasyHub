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

      // Check if cached data exists and is less than 3 days old
      if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp, 10)) < 3 * 24 * 60 * 60 * 1000) {
        setJobs(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://hrf.org/work/');
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
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="bg-background border border-border rounded-lg p-16 text-center text-white">Loading HRF Jobs...</div>;
  if (error) return <div className="bg-background border border-red-500 rounded-lg p-16 text-center text-red-500">Error loading HRF Jobs: {error}</div>;

  return (
    <div className="bg-background border border-border rounded-lg p-16">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">HRF Work - Live Opportunities</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Opportunities to defend human rights globally with Human Rights Foundation
        </p>

        {/* HRF Branding */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            {/* Using a placeholder icon or text for HRF branding */}
            <span className="text-xs font-medium text-primary">Powered by Human Rights Foundation</span>
          </div>
          <div className="text-xs text-muted-foreground">
            External website
          </div>
        </div>
      </div>

      <div className="space-y-4 h-[600px] overflow-y-auto"> {/* Added fixed height and scroll for job list */}
        {jobs.map((job, index) => (
          <div key={index} className="bg-zinc-700 p-4 rounded-md shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="text-gray-300 text-sm mt-1">
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
              className="mt-3 sm:mt-0 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-200"
            >
              Apply <ExternalLink className="ml-1 h-4 w-4 inline-block" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center space-y-3">
        <a
          href="https://hrf.org/work/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open HRF Website
        </a>
      </div>
    </div>
  );
};

export default HrfJobs;
