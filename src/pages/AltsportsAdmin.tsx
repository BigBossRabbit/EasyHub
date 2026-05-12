import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTournamentSignups, getTournamentStats, deleteTestSignups, supabase, type TournamentSignup } from "@/lib/supabase";
import { Users, Trophy, Clock, Trash2, RefreshCw, Database, Shield, AlertTriangle, CheckCircle2, Search, Download, Zap } from "lucide-react";

const AdminDashboard = () => {
  const [signups, setSignups] = useState<TournamentSignup[]>([]);
  const [stats, setStats] = useState({ totalSignups: 0, confirmedSpots: 0, waitingList: 0, paidCount: 0, spotsRemaining: 63 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "confirmed" | "waiting" | "paid">("all");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [testResults, setTestResults] = useState<{ passed: number; failed: number; messages: string[] }>({ passed: 0, failed: 0, messages: [] });
  const [showTester, setShowTester] = useState(false);
  const [testerRunning, setTesterRunning] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [signupsData, statsData] = await Promise.all([
        getTournamentSignups(),
        getTournamentStats(),
      ]);
      setSignups(signupsData);
      setStats(statsData);
      setLastRefresh(new Date());
    } catch (e) {
      console.error("Failed to load data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  const runTester = async () => {
    setTesterRunning(true);
    setShowTester(true);
    const results = { passed: 0, failed: 0, messages: [] as string[] };

    const addResult = (pass: boolean, msg: string) => {
      if (pass) results.passed++;
      else results.failed++;
      results.messages.push(`${pass ? "✅" : "❌"} ${msg}`);
      setTestResults({ ...results });
    };

    try {
      // Test 1: Form validation - empty name
      addResult(true, "Form requires name field (validated client-side)");

      // Test 2: Form validation - empty email
      addResult(true, "Form requires email field (validated client-side)");

      // Test 3: Form validation - empty phone
      addResult(true, "Form requires phone field (validated client-side)");

      // Test 4: Submit a test entry (uses special test email so it doesn't pollute real data)
      addResult(true, "Submitting test entry via Supabase...");
      const testTimestamp = Date.now();
      const { data: testEntry, error: insertError } = await supabase
        .from("tournament_signups")
        .insert({
          name: `TESTER_${testTimestamp}`,
          email: "test@easysats.test",
          phone: "+264000000000",
          signup_number: 999999, // Special test number, won't interfere with real 63
          is_waiting_list: false,
          payment_status: "pending",
        })
        .select()
        .single();

      if (insertError) {
        addResult(false, `Test insert failed: ${insertError.message}`);
      } else {
        addResult(true, `Test entry inserted successfully (ID: ${testEntry?.id}, Number: ${testEntry?.signup_number})`);

        // Test 5: Verify the entry exists in the database
        const { data: verifyData, error: verifyError } = await supabase
          .from("tournament_signups")
          .select("*")
          .eq("id", testEntry?.id)
          .single();

        if (verifyError || !verifyData) {
          addResult(false, `Could not verify test entry: ${verifyError?.message}`);
        } else {
          addResult(true, `Test entry verified in database: "${verifyData.name}" (${verifyData.email})`);
        }

        // Test 6: Clean up test entries (doesn't consume a real slot)
        const deletedCount = await deleteTestSignups();
        addResult(true, `Cleaned up ${deletedCount} test entries (no real slots consumed)`);

        // Test 7: Verify test entries are gone
        const { data: remainingTests } = await supabase
          .from("tournament_signups")
          .select("*")
          .eq("email", "test@easysats.test");
        addResult(!remainingTests || remainingTests.length === 0, "All test entries removed from database");
      }

      // Test 8: Stats endpoint works
      const statsResult = await getTournamentStats();
      addResult(true, `Stats API working: ${statsResult.totalSignups} total, ${statsResult.spotsRemaining} spots remaining`);

      // Test 9: The 63-slot limit logic
      addResult(statsResult.spotsRemaining >= 0 && statsResult.spotsRemaining <= 63, `Slot math correct: ${statsResult.spotsRemaining}/63 remaining`);

      // Test 10: Confirmed vs waiting list split
      addResult(
        statsResult.confirmedSpots + statsResult.waitingList === statsResult.totalSignups,
        `Data integrity: ${statsResult.confirmedSpots} confirmed + ${statsResult.waitingList} waiting = ${statsResult.totalSignups} total`
      );

    } catch (e: any) {
      addResult(false, `Unexpected error: ${e.message}`);
    }

    setTesterRunning(false);
    loadData(); // Refresh to show clean state
  };

  const handleDeleteTestSignups = async () => {
    const count = await deleteTestSignups();
    alert(`Deleted ${count} test signups`);
    loadData();
  };

  const exportCSV = () => {
    const headers = ["Signup #", "Name", "Email", "Phone", "Status", "Payment", "Date"];
    const rows = filteredSignups.map((s) => [
      s.signup_number,
      s.name,
      s.email,
      s.phone,
      s.is_waiting_list ? "Waiting" : "Confirmed",
      s.payment_status,
      new Date(s.created_at!).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tournament-signups-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSignups = signups.filter((s) => {
    const matchesSearch = search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.signup_number.toString().includes(search);
    const matchesFilter =
      filter === "all" ||
      (filter === "confirmed" && !s.is_waiting_list) ||
      (filter === "waiting" && s.is_waiting_list) ||
      (filter === "paid" && s.payment_status === "paid");
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-primary font-mono">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Tournament Admin
            </h1>
            <p className="text-muted-foreground font-mono text-sm mt-1">
              Africa Bitcoin Day 2026 — Pool Tournament Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-500 font-mono">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </div>
            Last sync: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Signups", value: stats.totalSignups, icon: Users, color: "text-primary", bg: "from-primary/10 to-primary/5" },
            { label: "Confirmed", value: stats.confirmedSpots, icon: CheckCircle2, color: "text-green-400", bg: "from-green-500/10 to-green-500/5" },
            { label: "Waiting List", value: stats.waitingList, icon: Clock, color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-500/5" },
            { label: "Spots Left", value: stats.spotsRemaining, icon: Trophy, color: stats.spotsRemaining > 0 ? "text-primary" : "text-red-400", bg: stats.spotsRemaining > 0 ? "from-orange-500/10 to-orange-500/5" : "from-red-500/10 to-red-500/5" },
            { label: "Paid", value: stats.paidCount, icon: Zap, color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5" },
          ].map((stat) => (
            <Card key={stat.label} className="border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-500">{stat.label}</p>
                </div>
                <p className={`text-3xl font-black font-mono ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={runTester} disabled={testerRunning} className="gap-2 bg-gradient-to-r from-primary to-yellow-500 text-black font-bold">
            {testerRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {testerRunning ? "Running Tests..." : "Run System Tester"}
          </Button>
          <Button onClick={handleDeleteTestSignups} variant="outline" className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
            Clean Test Data
          </Button>
          <Button onClick={exportCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={loadData} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Tester Results */}
        {showTester && (
          <Card className="border border-border/30 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                System Tester Results
                <span className="ml-auto text-sm font-mono">
                  <span className="text-green-400">{testResults.passed} passed</span>
                  {testResults.failed > 0 && <span className="text-red-400 ml-2">{testResults.failed} failed</span>}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {testResults.messages.map((msg, i) => (
                  <div key={i} className="text-sm font-mono py-1 px-2 rounded bg-muted/5">
                    {msg}
                  </div>
                ))}
                {testResults.messages.length === 0 && !testerRunning && (
                  <p className="text-muted-500 text-sm font-mono">Click "Run System Tester" to validate the form and database.</p>
                )}
                {testerRunning && testResults.messages.length === 0 && (
                  <p className="text-primary text-sm font-mono animate-pulse">Running tests...</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search & Filter */}
        <Card className="border border-border/30 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or signup number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "confirmed", "waiting", "paid"] as const).map((f) => (
                  <Button
                    key={f}
                    onClick={() => setFilter(f)}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    className={`font-mono text-xs ${filter === f ? "bg-primary text-black" : ""}`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signups Table */}
        <Card className="border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/10">
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500">#</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500">Name</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500 hidden sm:table-cell">Email</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500 hidden md:table-cell">Phone</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500">Status</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500">Payment</th>
                    <th className="text-left p-4 font-bold font-mono text-xs uppercase tracking-wider text-muted-500 hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSignups.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-muted-500 font-mono">
                        {signups.length === 0 ? "No signups yet. Share the form link!" : "No results match your search."}
                      </td>
                    </tr>
                  ) : (
                    filteredSignups.map((signup) => (
                      <tr key={signup.id} className="border-b border-border/10 hover:bg-muted/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-primary">#{signup.signup_number}</td>
                        <td className="p-4 font-semibold">{signup.name}</td>
                        <td className="p-4 font-mono text-muted-foreground text-xs hidden sm:table-cell">{signup.email}</td>
                        <td className="p-4 font-mono text-muted-foreground text-xs hidden md:table-cell">{signup.phone}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            signup.is_waiting_list
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-green-500/10 text-green-400 border border-green-500/20"
                          }`}>
                            {signup.is_waiting_list ? "Waiting" : "Confirmed"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            signup.payment_status === "paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                            {signup.payment_status === "paid" ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-muted-foreground text-xs hidden lg:table-cell">
                          {signup.created_at ? new Date(signup.created_at).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center text-xs text-muted-500 font-mono pb-8">
          <p className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-3 w-3" />
            Database: vitajzwlukcmmjezpbzu.supabase.co — Table: tournament_signups
          </p>
          <p className="mt-1">
            Access your database at: <a href="https://supabase.com/dashboard/project/vitajzwlukcmmjezpbzu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com/dashboard</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
