import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Clock, Users, AlertTriangle, CheckCircle2, Phone, Mail, User, Sparkles, Timer, Zap, Star, Crown, Shield, Crosshair } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { submitTournamentSignup, getTournamentStats, isSupabaseAvailable } from "@/lib/supabase";

const MAX_SPOTS = 64;

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
    {!eventCompleted ? (
      <>
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
      </>
    ) : (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-black/50 text-center py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-yellow-300">🏆 EVENT COMPLETED 🏆</h1>
          <p className="text-xl text-muted-foreground">
            The Africa Bitcoin Day 2026 Pool Tournament has successfully concluded.
          </p>
          <div className="space-y-4">
            <a
              href="/abd2026_pool_tournament_thank_you.txt"
              className="btn btn-primary w-fit"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Thank You Note
            </a>
          </div>
        </div>
      </div>
    </div>
  )
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [emailSent, setEmailSent] = useState(false);
  const [supabaseActive, setSupabaseActive] = useState(false);
  const [eventCompleted, setEventCompleted] = useState(true); // Event is now completed

  // Parallax mouse effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  // Load stats from Supabase
  const loadStats = useCallback(async () => {
    try {
      if (isSupabaseAvailable()) {
        const stats = await getTournamentStats();
        setTotalSignups(stats.totalSignups);
        setSpotsRemaining(stats.spotsRemaining);
        setSupabaseActive(true);
      }
    } catch {
      // Supabase not ready yet, use defaults
    }
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
    setEmailSent(false);

    try {
      if (!isSupabaseAvailable()) {
        throw new Error("Database is not connected. Please try again later.");
      }

      // Validate Namibian phone number format: +2648xxxxxxxx
      const phoneRegex = /^\+2648\d{8}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        throw new Error("Phone number must be in the format +2648xxxxxxxx (e.g. +264812345678)");
      }

      // Submit to Supabase — the DB assigns the signup number
      const result = await submitTournamentSignup(formData.name, formData.email, formData.phone);

      setSignupNumber(result.signup_number);
      setIsWaitingList(result.is_waiting_list);
      setSubmitted(true);

      if (!result.is_waiting_list) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }

      // Send confirmation email via edge function
      try {
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-tournament-confirmation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            signupNumber: result.signup_number,
            isWaitingList: result.is_waiting_list,
          }),
        });
        if (emailResponse.ok) {
          setEmailSent(true);
        }
      } catch {
        // Email failure shouldn't block the signup — already saved to DB
        console.warn("Confirmation email could not be sent, but signup was saved.");
      }

      // Refresh stats
      await loadStats();
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
    setEmailSent(false);
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
        description={`Sign up for the Africa Bitcoin Day 2026 Pool Tournament. First ${MAX_SPOTS} sign-ups only. 23 May 2026.`}
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 border border-yellow-500/30 rounded-full px-5 py-2 text-sm font-mono text-yellow-400 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
              </span>
              <span className="font-bold tracking-wider">EVENT COMPLETED</span>
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
              The Africa Bitcoin Day 2026 Pool Tournament has been successfully completed!
              <br />
              <span className="text-yellow-400 font-bold">Thank you</span> to all participants, sponsors, and winners for making this event amazing!
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <Trophy className="h-5 w-5 text-primary animate-bounce" style={{ animationDuration: "2s" }} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          {/* Event Completed Message */}
          <div className="relative mb-8 sm:mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl" />
            <Card className="relative border-2 border-yellow-500/30 bg-card/90 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                    TOURNAMENT COMPLETED
                  </span>
                  <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  🎉 Tournament Successfully Completed! 🎉
                </h2>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
                  <p className="text-lg text-yellow-200 leading-relaxed mb-4">
                    <strong>A huge thank you</strong> to everyone who participated in the Africa Bitcoin Day 2026 Pool Tournament! 
                    This event was a tremendous success thanks to our amazing participants, generous sponsors, and skilled winners.
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/10">
                      <p className="text-2xl font-black text-yellow-400 mb-1">{totalSignups}</p>
                      <p className="text-xs text-yellow-300 uppercase font-bold tracking-wider">Participants</p>
                    </div>
                    <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/10">
                      <p className="text-2xl font-black text-orange-400 mb-1">3</p>
                      <p className="text-xs text-orange-300 uppercase font-bold tracking-wider">Winners</p>
                    </div>
                    <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/10">
                      <p className="text-2xl font-black text-red-400 mb-1">5+</p>
                      <p className="text-xs text-red-300 uppercase font-bold tracking-wider">Sponsors</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-sm text-yellow-200 font-semibold">
                      🏆 Congratulations to all our winners and participants!
                    </p>
                    <p className="text-sm text-yellow-200 font-semibold">
                      🙏 Special thanks to our amazing sponsors for making this event possible!
                    </p>
                    <p className="text-sm text-yellow-200 font-semibold">
                      💰 All entry fees were converted to Bitcoin and used for tournament prizes!
                    </p>
                  </div>
                </div>

                {/* Thank you note link */}
                <div className="mt-6">
                  <a 
                    href="/abd2026_pool_tournament_thank_you.txt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30"
                  >
                    <Star className="h-5 w-5" />
                    Read Full Thank You Note
                    <Sparkles className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entry Form - Hidden since event is completed */}
          {!submitted && !eventCompleted && (
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
                        Namibian Phone Number <span className="text-[10px] normal-case tracking-normal text-muted-500">(required for tournament contact)</span>
                      </label>
                      <div className="flex items-center gap-0">
                        <div className="bg-muted/30 border border-border/50 rounded-l-xl px-4 py-3 text-sm font-mono text-muted-foreground select-none shrink-0">
                          +2648
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          maxLength={8}
                          pattern="[0-9]{8}"
                          value={formData.phone.replace(/^\+2648/, '')}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                            setFormData((prev) => ({ ...prev, phone: `+2648${digits}` }));
                            setError("");
                          }}
                          className="flex-1 bg-background/50 border border-border/50 border-l-0 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono placeholder:text-muted-foreground/30 transition-all duration-300 hover:border-border"
                          placeholder="12345678"
                        />
                      </div>
                      <p className="text-[10px] text-muted-500 font-mono">Enter your 8-digit Namibian number after +2648</p>
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

          {/* Rules Section */}
          <Card className="border border-border/30 bg-card/50 backdrop-blur-sm mb-8">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-bold">Tournament Rules & Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { text: `Only the first ${MAX_SPOTS} sign-ups are guaranteed a spot.`, highlight: `first ${MAX_SPOTS}` },
                  { text: "Payment must be completed by 1:00 PM on 23 May 2026.", highlight: "1:00 PM on 23 May 2026" },
                  { text: "Unpaid spots go to waiting list players present with a valid sign-up number.", highlight: "waiting list" },
                  { text: `Unlimited sign-ups accepted — entries beyond #${MAX_SPOTS} go to waiting list.`, highlight: `#${MAX_SPOTS}` },
                  { text: "Your sign-up number is your unique identifier — save it!", highlight: "sign-up number" },
                  { text: "A confirmation email will be sent with your sign-up details.", highlight: "confirmation email" },
                  { text: "Pool rules will be Old School Rules as Per Joker's Pizzeria — no compromise on that.", highlight: "Old School Rules as Per Joker's Pizzeria" },
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
              Presented in partnership with ABC Hub, Joker's Pizzeria & ConnectUs
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Altsports;
