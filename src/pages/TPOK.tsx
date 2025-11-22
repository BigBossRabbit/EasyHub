import React from 'react';
import { GraduationCap, ExternalLink, Youtube, BookOpen, Terminal, Play, Menu, Clock, BarChart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const videos = {
  trezorAcademy: [
    {
      id: 'w3hnFCfCo84',
      title: 'Trezor Academy Session I: Why Bitcoin?',
      description: 'Understanding the fundamental value proposition of Bitcoin and why it matters for financial sovereignty.'
    },
    {
      id: 'zFTLLJlMzAg',
      title: 'Trezor Academy Session II: How to use Bitcoin',
      description: 'Practical guide on self-custody, wallets, and safely interacting with the Bitcoin network.'
    },
    {
      id: 'SKhQg1lhp5U',
      title: 'How Bitcoin is empowering Africa',
      description: 'A chat with Nikolai "Okin" Tjongarero on the impact of Bitcoin adoption across the continent.'
    }
  ],
  interviews: [
    {
      id: 'UM82x8SndPo',
      title: 'Bitcoin in Namibia with Nikolai "OKIN" Tjongarero',
      category: 'Interview'
    },
    {
      id: 'RhEwWb34x2M',
      title: 'VEXL Demo | Nikolai Okin Tjongarero',
      category: 'Demo'
    },
    {
      id: '47eNiHUFNKQ',
      title: 'Chatting with Nikolai "OKIN" Tjongarero',
      category: 'Interview'
    },
    {
      id: 'D7SQdI8vYgo',
      title: 'Pay me in sovereignty',
      category: 'Talk'
    },
    {
      id: 'rVevVGNkXbI',
      title: 'Sovereign Key: FOSS Tools for Digital Privacy',
      category: 'Technical'
    },
    {
      id: 'gmB4Vw69yAc',
      title: 'Exploring Best Meat, Music, Bitcoin',
      category: 'Lifestyle'
    },
    {
      id: 'azAnsreJ8dI',
      title: 'The Evening Review | Nikolai Tjongarero',
      category: 'News'
    }
  ]
};

const courses = [
  {
    title: "The Bitcoin Journey",
    duration: "7 hours",
    level: "Beginner",
    description: "Discover Bitcoin fundamentals, including its monetary value proposition, miners, transactions, and wallets.",
    url: "https://planb.academy/en/courses/the-bitcoin-journey-2b7dc507-81e3-4b70-88e6-41ed44239966"
  },
  {
    title: "Getting your first bitcoins",
    duration: "14 hours",
    level: "Beginner",
    description: "Learn how to buy, secure, and manage your first bitcoins independently.",
    url: "https://planb.academy/en/courses/getting-your-first-bitcoins-f3e3843d-1a1d-450c-96d6-d7232158b81f"
  },
  {
    title: "Setting up your first Bitcoin node",
    duration: "10 hours",
    level: "Intermediate",
    description: "Understanding, installing, configuring, and using a Bitcoin node.",
    url: "https://planb.academy/en/courses/setting-up-your-first-bitcoin-node-3cd9cb94-82e8-417a-9c5a-02afc2589426"
  }
];

const galleryImages = [
  '/tpok/IMG_2930.JPG',
  '/tpok/IMG_2945.JPG',
  // Removed IMG_2922.JPG and IMG_2925.JPG as requested
  '/tpok/IMG_2935.JPG',
  '/tpok/IMG_2950.JPG',
  '/tpok/062A5160.JPG',
  '/tpok/062A5180.JPG',
  '/tpok/062A5150.JPG'
  // Removed 062A5170.JPG as requested
];

const TPOK = () => {
  return (
    <div className="min-h-screen text-foreground font-mono pb-24">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-primary">easy</span>
                  <span className="text-foreground">sats</span>
                  <span className="text-muted-foreground animate-pulse">_</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</a>
              <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">~/about</a>
              <a href="/connect" className="text-muted-foreground hover:text-primary transition-colors">~/connect</a>
              <a href="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</a>
              <a href="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</a>
              <a href="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</a>
              <a href="/tpok" className="text-primary">~/tpok</a>
            </nav>

            {/* Mobile Navigation (Hamburger Menu) */}
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-background border-border">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-border">
                  <nav className="flex flex-col gap-4 pt-8 font-mono">
                    <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">~/home</Link>
                    <Link to="/about" className="text-lg font-semibold hover:text-primary transition-colors">~/about</Link>
                    <Link to="/connect" className="text-lg font-semibold hover:text-primary transition-colors">~/connect</Link>
                    <Link to="/easydevs" className="text-lg font-semibold hover:text-primary transition-colors">~/easydevs</Link>
                    <Link to="/easyjobs" className="text-lg font-semibold hover:text-primary transition-colors">~/easyjobs</Link>
                    <Link to="/timeforce" className="text-lg font-semibold hover:text-primary transition-colors">~/timeforce</Link>
                    <Link to="/tpok" className="text-lg font-semibold text-primary">~/tpok</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 mt-8 px-4 md:px-8">
        <div className="border border-primary/30 bg-black/60 backdrop-blur-sm rounded-lg p-6 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Terminal className="w-6 h-6" />
              <span className="text-sm tracking-wider">ROOT_ACCESS_GRANTED</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              The Persuit Of <span className="text-primary">Knowledge</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Empowering communities through Bitcoin education. From grassroots workshops in Namibia to global stages,
              we're building the educational layer for the future of finance.
            </p>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Trezor Academy Series */}
      <section className="max-w-7xl mx-auto mb-20 px-4 md:px-8">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Trezor Academy Series</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.trezorAcademy.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card/50 border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(247,147,26,0.1)]"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-5 h-5 text-black fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {video.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Interviews & Talks Grid */}
      <section className="max-w-7xl mx-auto mb-20 px-4 md:px-8">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
          <Youtube className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Interviews & Talks</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.interviews.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card/30 border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video relative">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium text-primary border border-primary/30">
                  {video.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto mb-20 px-4 md:px-8">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold">On The Ground</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden group cursor-pointer ${index === 0 || index === 7 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img
                src={src}
                alt={`Teaching session ${index + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Plan B Network Resources */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-gray-900/90 to-black/90 border border-primary/30 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="text-primary font-bold tracking-wider">PLAN B NETWORK</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Free Bitcoin Education
                </h2>
                <p className="text-gray-400 text-lg">
                  Access world-class Bitcoin educational resources for free. From basics to advanced technical concepts,
                  start your journey down the rabbit hole today.
                </p>
              </div>
              <a
                href="https://planb.academy/en/learn-anytime"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(247,147,26,0.3)]"
              >
                View All Courses
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Featured Courses Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <a
                  key={index}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-900/50 px-2 py-1 rounded border border-gray-800">
                      <BarChart className="w-3 h-3" />
                      {course.level}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Start Course <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>
    </div>
  );
};

export default TPOK;
