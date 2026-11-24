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

-- Policies, numbering trigger and aggregate RPCs live in
-- supabase/migrations/20261124000000_tighten_tournament_signups.sql
-- Public may insert; only authenticated admins may read/update/delete.

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tournament_signups_email ON public.tournament_signups(email);
CREATE INDEX IF NOT EXISTS idx_tournament_signups_number ON public.tournament_signups(signup_number);
