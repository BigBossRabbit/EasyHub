import React, { useEffect, useState } from 'react';
import { Briefcase, ExternalLink } from "lucide-react";

interface Job {
  title: string;
  url: string;
}

interface FeedData {
  generatedAt: string;
  jobs: {
    stackerNews: unknown[];
    hrf: { ok: boolean; jobs: Job[] };
  };
  bounties: unknown[];
  news: unknown[];
}

const STALE_MS = 72 * 60 * 60 * 1000; // feeds refresh every 6h; 72h means the pipeline is down

const HrfJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'empty' | 'stale'>('loading');
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/feeds.json');
        if (!res.ok) throw new Error(`feeds.json ${res.status}`);
        const data: FeedData = await res.json();
        if (cancelled) return;
        const age = Date.now() - new Date(data.generatedAt).getTime();
        setGeneratedAt(new Date(data.generatedAt).toLocaleString());
        setJobs(data.jobs.hrf.jobs || []);
        if (age > STALE_MS || (!data.jobs.hrf.ok && age > STALE_MS)) setState('stale');
        else if ((data.jobs.hrf.jobs || []).length > 0) setState('ready');
        else setState('empty');
      } catch {
        if (!cancelled) setState('stale');
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (state === 'loading') return <div className="bg-background border border-border rounded-lg p-6 text-center text-white">Loading HRF Jobs...</div>;

  if (state === 'stale') {
    return (
      <div className="bg-background border border-border rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">Human Rights Foundation — Careers</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          The live feed is temporarily offline. HRF's current openings are on their site:
        </p>
        <a
          href="https://hrf.org/work/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
        >
          View openings on hrf.org <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">HRF Work — Live Opportunities</span>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          Opportunities to defend human rights globally
        </p>
        {generatedAt && (
          <p className="text-xs text-muted-foreground">Synced {generatedAt}</p>
        )}
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto border border-border rounded-lg p-4 bg-background">
        {jobs.map((job) => (
          <div key={job.url} className="bg-zinc-800/50 p-4 rounded-md shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="text-gray-400 text-sm mt-1">Human Rights Foundation</p>
            </div>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Apply <ExternalLink className="ml-1 h-4 w-4 inline-block" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
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
