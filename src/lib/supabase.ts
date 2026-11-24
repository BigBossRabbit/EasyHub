import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if both values are present
export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export function isSupabaseAvailable(): boolean {
  return supabase !== null;
}

// --- Tournament Signups ---

export interface TournamentSignup {
  id?: number;
  name: string;
  email: string;
  phone: string;
  signup_number: number;
  is_waiting_list: boolean;
  payment_status: 'pending' | 'paid';
  created_at?: string;
}

// Public insert goes through a SECURITY DEFINER RPC: anon may not read the table,
// so it cannot use INSERT ... RETURNING. The server assigns the number.
export async function submitTournamentSignup(
  name: string,
  email: string,
  phone: string
): Promise<Pick<TournamentSignup, 'signup_number' | 'is_waiting_list'>> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.rpc('create_tournament_signup', {
    p_name: name,
    p_email: email,
    p_phone: phone,
  });

  if (error) throw error;
  return data as Pick<TournamentSignup, 'signup_number' | 'is_waiting_list'>;
}

export async function getTournamentSignups(): Promise<TournamentSignup[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('tournament_signups')
    .select('*')
    .order('signup_number', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getTournamentStats() {
  if (!supabase) {
    return { totalSignups: 0, confirmedSpots: 0, waitingList: 0, paidCount: 0, spotsRemaining: 64 };
  }

  const { data, error } = await supabase.rpc('get_tournament_stats');
  if (error) throw error;

  const stats = (data || {}) as { total?: number; confirmed?: number; waiting?: number; paid?: number };
  const confirmedSpots = stats.confirmed || 0;

  return {
    totalSignups: stats.total || 0,
    confirmedSpots,
    waitingList: stats.waiting || 0,
    paidCount: stats.paid || 0,
    spotsRemaining: Math.max(0, 64 - confirmedSpots),
  };
}

export async function getTestSignups(): Promise<TournamentSignup[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('tournament_signups')
    .select('*')
    .eq('email', 'test@easysats.test')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function deleteTestSignups(): Promise<number> {
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from('tournament_signups')
    .delete()
    .eq('email', 'test@easysats.test')
    .select();
  if (error) throw error;
  return data?.length || 0;
}

// --- Admin auth ---

export async function adminSignIn(email: string, password: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function adminSignOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getAdminSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAdminAuthChange(cb: (signedIn: boolean) => void): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(!!session));
  return () => data.subscription.unsubscribe();
}
