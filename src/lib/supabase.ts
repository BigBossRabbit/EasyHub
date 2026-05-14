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

export async function submitTournamentSignup(
  name: string,
  email: string,
  phone: string
): Promise<TournamentSignup> {
  if (!supabase) throw new Error('Supabase not configured');

  const { count } = await supabase
    .from('tournament_signups')
    .select('*', { count: 'exact', head: true });

  const signupNumber = (count || 0) + 1;
  const isWaitingList = signupNumber > 64;

  const { data, error } = await supabase
    .from('tournament_signups')
    .insert({
      name,
      email,
      phone,
      signup_number: signupNumber,
      is_waiting_list: isWaitingList,
      payment_status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
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

  const { count: totalSignups } = await supabase
    .from('tournament_signups')
    .select('*', { count: 'exact', head: true });

  const { count: confirmedSpots } = await supabase
    .from('tournament_signups')
    .select('*', { count: 'exact', head: true })
    .eq('is_waiting_list', false);

  const { count: waitingList } = await supabase
    .from('tournament_signups')
    .select('*', { count: 'exact', head: true })
    .eq('is_waiting_list', true);

  const { count: paidCount } = await supabase
    .from('tournament_signups')
    .select('*', { count: 'exact', head: true })
    .eq('payment_status', 'paid');

  return {
    totalSignups: totalSignups || 0,
    confirmedSpots: confirmedSpots || 0,
    waitingList: waitingList || 0,
    paidCount: paidCount || 0,
    spotsRemaining: Math.max(0, 64 - (confirmedSpots || 0)),
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
