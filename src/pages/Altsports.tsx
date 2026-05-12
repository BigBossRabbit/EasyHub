import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Clock, Users, AlertTriangle, CheckCircle2, Phone, Mail, User, Sparkles, Timer, Zap, Star, Crown, Shield, Crosshair } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// --- localStorage-based signup system (works without any backend) ---

interface SignupEntry {
  name: string;
  email: string;
  phone: string;
  timestamp: string;
  signupNumber: number;
}

const STORAGE_KEY = "africa-bitcoin-day-2026-signups";
const MAX_SPOTS = 63;

function getLocalSignups(): SignupEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalSignup(entry: SignupEntry) {
  const entries = getLocalSignups();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Confetti particle component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: ["#FF7000", "#FFD700", "#FFA500", "#FF4500", "#FFFF00", "#00FF00"][Math.floor(Math.random() * 6)],
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated counter
const AnimatedNumber = ({ value, className }: { value: number; className?: string }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 800;
    const steps = 20;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span className={className}>{display}</span>;
};

const Altsports = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [signupNumber, setSignupNumber] = useState<number | null>(null);
  const [totalSignups, setTotalSignups] = useState(0);
  const [spotsRemaining, setSpotsRemaining] = useState(MAX_SPOTS);
  const [isWaitingList, setIsWaitingList] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSignups, setRecentSignups] = useState<SignupEntry[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [synced, setSynced] = useState(false);

  // Parallax mouse effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  // Load stats from localStorage
  const loadStats = useCallback(() => {
    const entries = getLocalSignups();
    setTotalSignups(entries.length);
    setSpotsRemaining(Math.max(0, MAX_SPOTS - entries.length));
    setRecentSignups(entries.slice(-5).reverse());
  }, []);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, [loadStats]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const entries = getLocalSignups();
      const nextNumber = entries.length + 1;
      const newEntry: SignupEntry = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        signupNumber: nextNumber,
      };

      // Always save to localStorage first
      saveLocalSignup(newEntry);
      setSignupNumber(nextNumber);
      setIsWaitingList(nextNumber > MAX_SPOTS);
      setSubmitted(true);

      if (nextNumber <= MAX_SPOTS) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }

      loadStats();
    } catch (err: any) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSignupNumber(null);
    setIsWaitingList(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  const progressPercent = Math.min(100, ((MAX_SPOTS - spotsRemaining) / MAX_SPOTS) * 100);

  return (
    <div className="min-h-screen text-foreground flex flex-col relative overflow-hidden" onMouseMove={handleMouseMove}>
      <Confetti active={showConfetti} />

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] transition-transform duration-[2000ms]"
          style={{ top: "-10%", left: "-10%", transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[100px] transition-transform duration-[2000ms]"
          style={{ bottom: "-10%", right: "-10%", transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-orange-500/3 blur-[80px] transition-transform duration-[2000ms]"
          style={{ top: "40%", right: "20%", transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
        />
      </div>

      <Seo
        title="Africa Bitcoin Day 2026 — Pool Tournament Entry | EasySats"
        description="Sign up for the Africa Bitcoin Day 2026 Pool Tournament. First 63 sign-ups only. 23 May 2026."
        canonical="/altsports"
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Partner Logos Banner */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 flex-wrap">
            {[
              { src: "/africa-bitcoin-day/africa-bitday-logo.png", alt: "Africa Bitcoin Day" },
              { src: "/africa-bitcoin-day/abc-hub-logo.png", alt: "ABC Hub" },
              { src: "/africa-bitcoin-day/jokers-logo.jpeg", alt: "Jokers" },
              { src: "/africa-bitcoin-day/easysats-logo.png", alt: "EasySats" },
            ].map((logo) => (
              <div key={logo.alt} className="group relative">
                <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="relative h-12 sm:h-16 md:h-20 object-contain drop-shadow-lg opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 space-y-5 relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 via-yellow-500/20 to-primary/20 border border-primary/30 rounded-full px-5 py-2 text-sm font-mono text-primary backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="font-bold tracking-wider">TOURNAMENT ENTRY OPEN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
                Africa Bitcoin Day
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  2026 Pool Tournament
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              The most anticipated pool tournament of the year.
              <br />
              <span className="text-primary font-bold">Sign up now</span> — only the first <span className="text-yellow-400 font-bold">63 entries</span> are guaranteed a spot!
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <Trophy className="h-5 w-5 text-primary animate-bounce" style={{ animationDuration: "2s" }} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          {/* Live Spots Counter */}
          <div className="relative mb-8 sm:mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-yellow-500/10 to-primary/20 rounded-2xl blur-xl" />
            <Card className="relative border-2 border-primary/30 bg-gradient-to-br from-card/90 via-card to-card/90 backdrop-blur-sm overflow-hidden">
              {/* Animated scan line */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line" />
              </div>

              <CardContent className="p-6 sm:p-8 text-center relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                    Live Tournament Spots
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <AnimatedNumber
                    value={spotsRemaining}
                    className={`text-6xl sm:text-7xl md:text-8xl font-black font-mono tabular-nums ${
                      spotsRemaining > 10
                        ? "text-primary"
                        : spotsRemaining > 0
                        ? "text-yellow-400 animate-pulse"
                        : "text-red-500"
                    }`}
                  />
                  <span className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-mono font-bold">/ {MAX_SPOTS}</span>
                </div>

                <p className={`text-sm font-mono font-bold mb-5 ${spotsRemaining > 0 ? "text-muted-foreground" : "text-red-400"}`}>
                  {spotsRemaining > 0
                    ? `⚡ ${spotsRemaining} spot${spotsRemaining !== 1 ? "s" : ""} remaining — don't miss out!`
                    : "🔥 ALL SPOTS FILLED — join the waiting list"}
                </p>

                {/* Progress bar */}
                <div className="relative w-full bg-muted/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-border/30">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{
                      width: `${progressPercent}%`,
                      background: progressPercent < 60
                        ? "linear-gradient(90deg, #FF7000, #FFD700)"
                        : progressPercent < 85
                        ? "linear-gradient(90deg, #FFD700, #FFA500)"
                        : "linear-gradient(90deg, #FFA500, #FF4500)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="bg-muted/10 rounded-lg p-3 border border-border/20">
                    <p className="text-[10px] text-muted-500 uppercase font-bold tracking-wider">Confirmed</p>
                    <p className="text-xl font-black font-mono text-primary">{Math.min(totalSignups, MAX_SPOTS)}</p>
                  </div>
                  <div className="bg-muted/10 rounded-lg p-3 border border-border/20">
                    <p className="text-[10px] text-muted-500 uppercase font-bold tracking-wider">Waiting</p>
                    <p className="text-xl font-black font-mono text-yellow-400">{Math.max(0, totalSignups - MAX_SPOTS)}</p>
                  </div>
                  <div className="bg-muted/10 rounded-lg p-3 border border-border/20">
                    <p className="text-[10px] text-muted-500 uppercase font-bold tracking-wider">Total</p>
                    <p className="text-xl font-black font-mono text-foreground">{totalSignups}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details */}
          <Card className="border border-border/50 bg-card/80 backdrop-blur-sm mb-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Event Details</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: "Date", value: "Saturday, 23 May 2026", color: "text-primary" },
                  { icon: Clock, label: "Payment Deadline", value: "1:00 PM — 23 May 2026", color: "text-yellow-400" },
                  { icon: Trophy, label: "Format", value: "Pool Tournament — 63 Players", color: "text-primary" },
                  { icon: Crosshair, label: "Entry Rule", value: "First 63 sign-ups only", color: "text-red-400" },
                ].map((item) => (
                  <div key={item.label} className="group flex items-start gap-3 bg-muted/5 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-muted/10">
                    <div className={`p-2 rounded-lg bg-muted/20 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-muted-500">{item.label}</p>
                      <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* After Submission: Sign-Up Number Display */}
          {submitted && signupNumber !== null && (
            <div className="relative mb-8">
              <div className={`absolute inset-0 rounded-2xl blur-xl ${isWaitingList ? "bg-yellow-500/10" : "bg-primary/10"}`} />
              <Card className={`relative border-2 ${isWaitingList ? "border-yellow-500/40" : "border-primary/40"} bg-card/90 backdrop-blur-sm overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <CardContent className="p-6 sm:p-10 text-center space-y-5">
                  {isWaitingList ? (
                    <>
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30">
                        <Timer className="h-12 w-12 text-yellow-400 animate-pulse" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-yellow-400">Waiting List</h2>
                      <div className="py-4">
                        <div className="relative inline-block">
                          <p className="text-7xl sm:text-8xl md:text-9xl font-black font-mono text-yellow-400 tabular-nums">
                            #{signupNumber}
                          </p>
                          <div className="absolute -top-3 -right-6">
                            <Crown className="h-8 w-8 text-yellow-400 rotate-12" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 font-mono font-bold">Your Sign-Up Number</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-md mx-auto backdrop-blur-sm">
                        <p className="text-sm text-yellow-200 leading-relaxed">
                          All <strong>{MAX_SPOTS}</strong> tournament spots are currently claimed. You're on the <strong className="text-yellow-400">waiting list</strong>.
                          Open spots go to waitlisted players who show up!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-yellow-500/20 border-2 border-primary/30 relative">
                        <Sparkles className="h-12 w-12 text-primary" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black">
                        <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
                          You're In! 🎉
                        </span>
                      </h2>
                      <div className="py-4">
                        <div className="relative inline-block">
                          <p className="text-8xl sm:text-9xl font-black font-mono text-primary tabular-nums">
                            #{signupNumber}
                          </p>
                          <div className="absolute -top-4 -right-8 animate-bounce" style={{ animationDuration: "1.5s" }}>
                            <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 font-mono font-bold">
                          Your Sign-Up Number — <span className="text-yellow-400">of {MAX_SPOTS}</span>
                        </p>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 max-w-md mx-auto backdrop-blur-sm">
                        <p className="text-sm text-primary-foreground/80 leading-relaxed">
                          <strong>🔐 Save your sign-up number!</strong> You'll need it on tournament day.
                          Payment deadline: <strong className="text-red-400">1:00 PM, 23 May 2026</strong>
                        </p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-md mx-auto">
                        <p className="text-sm text-red-300 leading-relaxed">
                          <strong>⚠️ Important:</strong> If you haven't paid by the deadline, your spot goes to the waiting list.
                        </p>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Button onClick={resetForm} variant="outline" className="border-border hover:bg-muted font-mono text-sm px-8 py-2">
                      ← Submit Another Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Entry Form */}
          {!submitted && (
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl blur-xl" />
              <Card className="relative border-2 border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground/50 border border-border/30 px-2 py-0.5 rounded">
                  ABD-2026
                </div>

                <CardContent className="p-5 sm:p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="text-2xl sm:text-3xl font-black">Tournament Entry</h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      // Secure your spot — first come, first served. Only {MAX_SPOTS} spots available.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-2 group">
                      <label htmlFor="name" className="text-xs font-black flex items-center gap-2 uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                        <User className="h-4 w-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono placeholder:text-muted-foreground/30 transition-all duration-300 hover:border-border"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2 group">
                      <label htmlFor="email" className="text-xs font-black flex items-center gap-2 uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono placeholder:text-muted-foreground/30 transition-all duration-300 hover:border-border"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2 group">
                      <label htmlFor="phone" className="text-xs font-black flex items-center gap-2 uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono placeholder:text-muted-foreground/30 transition-all duration-300 hover:border-border"
                        placeholder="+264 81 234 5678"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 font-mono text-center">
                        ⚠️ {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center pt-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="relative w-full md:w-auto gap-3 font-black uppercase tracking-wider bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_100%] hover:bg-right text-black py-4 px-10 rounded-xl transition-all duration-500 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-base"
                      >
                        {loading ? (
                          <>
                            <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Trophy className="h-5 w-5" />
                            Enter Tournament
                            <Zap className="h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Signups Ticker */}
          {recentSignups.length > 0 && (
            <Card className="border border-border/30 bg-card/50 backdrop-blur-sm mb-8 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Live Sign-Ups</p>
                </div>
                <div className="space-y-2">
                  {recentSignups.map((signup, i) => (
                    <div key={`${signup.signupNumber}-${i}`} className="flex items-center gap-3 bg-muted/5 rounded-lg px-3 py-2 border border-border/20 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-yellow-500/20 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-black font-mono text-primary">#{signup.signupNumber}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{signup.name}</p>
                        <p className="text-[10px] text-muted-500 font-mono truncate">{signup.email}</p>
                      </div>
                      <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        signup.signupNumber > MAX_SPOTS
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}>
                        {signup.signupNumber > MAX_SPOTS ? "Waiting" : "Confirmed"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rules Section */}
          <Card className="border border-border/30 bg-card/50 backdrop-blur-sm mb-8">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-bold">Tournament Rules & Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { text: "Only the first 63 sign-ups are guaranteed a spot.", highlight: "first 63" },
                  { text: "Payment must be completed by 1:00 PM on 23 May 2026.", highlight: "1:00 PM on 23 May 2026" },
                  { text: "Unpaid spots go to waiting list players present with a valid sign-up number.", highlight: "waiting list" },
                  { text: "Unlimited sign-ups accepted — entries beyond #63 go to waiting list.", highlight: "#63" },
                  { text: "Your sign-up number is your unique identifier — save it!", highlight: "sign-up number" },
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-0.5 p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rule.text.split(rule.highlight).map((part, j) => (
                        <span key={j}>
                          {part}
                          {j < rule.text.split(rule.highlight).length - 1 && (
                            <strong className="text-foreground">{rule.highlight}</strong>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground font-mono space-y-2 pb-8">
            <div className="flex items-center justify-center gap-3">
              <span className="text-primary text-lg">₿</span>
              <span className="font-bold">Powered by EasySats — Africa Bitcoin Day 2026</span>
              <span className="text-primary text-lg">₿</span>
            </div>
            <p className="text-xs text-muted-foreground/50">
              Presented in partnership with ABC Hub, Jokers & EasySats
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Altsports;
