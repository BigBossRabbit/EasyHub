-- Run this in Supabase SQL Editor to create the tournament signups table
-- URL: https://supabase.com/dashboard/project/kfvgdegoxtnxhgclujut/sql/new
-- 64 players for a full tournament bracket

CREATE TABLE IF NOT EXISTS public.tournament_signups (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL CHECK (phone ~ '^\+2648[0-9]{8}$'),
    signup_number INT NOT NULL,
    is_waiting_list BOOLEAN NOT NULL DEFAULT false,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tournament_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can insert signups" ON public.tournament_signups
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read (for stats display)
CREATE POLICY "Anyone can read signups" ON public.tournament_signups
    FOR SELECT USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tournament_signups_email ON public.tournament_signups(email);
CREATE INDEX IF NOT EXISTS idx_tournament_signups_number ON public.tournament_signups(signup_number);
