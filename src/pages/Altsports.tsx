import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Clock, Users, AlertTriangle, CheckCircle2, Phone, Mail, User, Sparkles, Timer } from "lucide-react";
import { useState, useEffect } from "react";

interface SignupEntry {
  name: string;
  email: string;
  phone: string;
  timestamp: string;
  signupNumber: number;
}

const STORAGE_KEY = "africa-bitcoin-day-2026-signups";
const MAX_SPOTS = 63;

const Altsports = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [signupNumber, setSignupNumber] = useState<number | null>(null);
  const [totalSignups, setTotalSignups] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const entries: SignupEntry[] = JSON.parse(stored);
      setTotalSignups(entries.length);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem(STORAGE_KEY);
    const entries: SignupEntry[] = stored ? JSON.parse(stored) : [];

    const nextNumber = entries.length + 1;

    const newEntry: SignupEntry = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      timestamp: new Date().toISOString(),
      signupNumber: nextNumber,
    };

    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    setSignupNumber(nextNumber);
    setTotalSignups(entries.length);
    setSubmitted(true);
  };

  const spotsRemaining = Math.max(0, MAX_SPOTS - totalSignups);
  const isWaitingList = signupNumber !== null && signupNumber > MAX_SPOTS;

  const resetForm = () => {
    setSubmitted(false);
    setSignupNumber(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Seo
        title="Africa Bitcoin Day 2026 — Pool Tournament Entry | EasySats"
        description="Sign up for the Africa Bitcoin Day 2026 Pool Tournament. First 63 sign-ups only. 23 May 2026."
        canonical="/altsports"
      />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Partner Logos Banner */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-10 flex-wrap opacity-80 hover:opacity-100 transition-opacity">
            <img
              src="/africa-bitcoin-day/africa-bitday-logo.png"
              alt="Africa Bitcoin Day"
              className="h-16 md:h-20 object-contain drop-shadow-lg"
            />
            <img
              src="/africa-bitcoin-day/abc-hub-logo.png"
              alt="ABC Hub"
              className="h-16 md:h-20 object-contain drop-shadow-lg"
            />
            <img
              src="/africa-bitcoin-day/jokers-logo.jpeg"
              alt="Jokers"
              className="h-16 md:h-20 object-contain drop-shadow-lg rounded-md"
            />
            <img
              src="/africa-bitcoin-day/easysats-logo.png"
              alt="EasySats"
              className="h-16 md:h-20 object-contain drop-shadow-lg"
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-sm font-mono text-primary mb-2">
              <Trophy className="h-4 w-4" />
              <span>TOURNAMENT ENTRY OPEN</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-primary">Africa Bitcoin Day</span>
              <br />
              <span className="text-yellow-400">2026 Pool Tournament</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              The most anticipated pool tournament of the year. Sign up now — only the first 63 entries are guaranteed a spot!
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-primary via-yellow-400 to-primary mx-auto rounded-full mt-4" />
          </div>

          {/* Spots Remaining Counter */}
          <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-primary/5 mb-8">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                  Tournament Spots
                </span>
              </div>
              <div className="text-5xl md:text-6xl font-bold font-mono">
                <span className={spotsRemaining > 0 ? "text-primary" : "text-red-500"}>
                  {spotsRemaining}
                </span>
                <span className="text-muted-foreground text-3xl md:text-4xl"> / {MAX_SPOTS}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-mono">
                {spotsRemaining > 0
                  ? `spots remaining — don't miss out!`
                  : "ALL SPOTS FILLED — join the waiting list below"}
              </p>
              {/* Progress bar */}
              <div className="mt-4 w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary to-yellow-400"
                  style={{ width: `${Math.min(100, ((MAX_SPOTS - spotsRemaining) / MAX_SPOTS) * 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Details Info Box */}
          <Card className="border border-border bg-card mb-8">
            <CardHeader className="border-b border-border bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Event Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-muted/10 rounded-lg p-4 border border-border/50">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Date</p>
                    <p className="text-muted-foreground text-sm">Saturday, 23 May 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/10 rounded-lg p-4 border border-border/50">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Payment Deadline</p>
                    <p className="text-muted-foreground text-sm">1:00 PM — 23 May 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/10 rounded-lg p-4 border border-border/50">
                  <Trophy className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Format</p>
                    <p className="text-muted-foreground text-sm">Pool Tournament — 63 Players</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/10 rounded-lg p-4 border border-border/50">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Entry Rule</p>
                    <p className="text-muted-foreground text-sm">First 63 sign-ups only</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* After Submission: Sign-Up Number Display */}
          {submitted && signupNumber !== null && (
            <Card className={`border-2 mb-8 ${isWaitingList ? "border-yellow-500/50 bg-yellow-500/5" : "border-primary/50 bg-primary/5"}`}>
              <CardContent className="p-8 text-center space-y-4">
                {isWaitingList ? (
                  <>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/30 mb-2">
                      <Timer className="h-10 w-10 text-yellow-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
                      You're on the Waiting List
                    </h2>
                    <div className="py-4">
                      <p className="text-6xl md:text-7xl font-bold font-mono text-yellow-400">
                        #{signupNumber}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 font-mono">
                        Sign-Up Number
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-yellow-200">
                        All {MAX_SPOTS} tournament spots are currently claimed. You've been placed on the <strong>waiting list</strong>.
                        If any of the first {MAX_SPOTS} players don't pay by the deadline, you'll move up!
                      </p>
                    </div>
                    <div className="bg-muted/20 border border-border/50 rounded-lg p-4 max-w-md mx-auto">
                      <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Payment deadline: <strong className="text-foreground">1:00 PM, 23 May 2026</strong></span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-2">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      You're In! 🎉
                    </h2>
                    <div className="py-4">
                      <p className="text-7xl md:text-8xl font-bold font-mono text-primary">
                        #{signupNumber}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 font-mono">
                        Your Sign-Up Number — <span className="text-yellow-400">of {MAX_SPOTS}</span>
                      </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-primary-foreground/80">
                        <strong>Save your sign-up number!</strong> You'll need it on tournament day.
                        Make sure to complete your payment before the deadline to secure your spot.
                      </p>
                    </div>
                    <div className="bg-muted/20 border border-border/50 rounded-lg p-4 max-w-md mx-auto">
                      <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-red-400" />
                        <span>Payment deadline: <strong className="text-red-400">1:00 PM, 23 May 2026</strong></span>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-yellow-200">
                        <strong>⚠️ Important:</strong> If you haven't paid by the deadline, your spot may be given to someone on the waiting list who is present with a valid sign-up number.
                      </p>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-border hover:bg-muted font-mono text-sm"
                  >
                    Submit Another Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Entry Form */}
          {!submitted && (
            <Card className="border-2 border-border bg-card shadow-lg relative overflow-hidden mb-8">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground border border-border px-1">
                ABD-2026
              </div>

              <CardHeader className="border-b border-border bg-muted/30 pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Tournament Entry Form</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  // Secure your spot — first come, first served. Only {MAX_SPOTS} spots available.
                </p>
              </CardHeader>

              <CardContent className="p-6 md:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold flex items-center gap-2 uppercase">
                      <User className="h-4 w-4 text-primary" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold flex items-center gap-2 uppercase">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold flex items-center gap-2 uppercase">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                      placeholder="+264 81 234 5678"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      className="w-full md:w-auto gap-2 font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-500/90 text-black"
                    >
                      <Trophy className="h-4 w-4" />
                      Enter Tournament
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Rules Section */}
          <Card className="border border-border/50 bg-muted/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>Tournament Rules & Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p>Only the <strong className="text-foreground">first 63 sign-ups</strong> are guaranteed a spot in the tournament.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p>Payment must be completed by <strong className="text-red-400">1:00 PM on 23 May 2026</strong> to secure your spot.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p>If a signed-up player hasn't paid by the deadline, their spot may be given to someone on the <strong className="text-foreground">waiting list</strong> who is present with a valid sign-up number.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p>Unlimited sign-ups are accepted, but entries beyond #63 are placed on the waiting list.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p>Your <strong className="text-foreground">sign-up number</strong> is your unique identifier — save it and present it on tournament day.</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-muted-foreground font-mono space-y-1">
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">₿</span>
              <span>Powered by EasySats — Africa Bitcoin Day 2026</span>
              <span className="text-primary">₿</span>
            </p>
            <p className="text-xs text-muted-foreground/60">
              Presented in partnership with ABC Hub, Jokers & EasySats
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Altsports;
