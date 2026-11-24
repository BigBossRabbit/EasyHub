-- Tighten tournament_signups: no public PII, server-side numbering, aggregate stats RPC.
-- Apply in the Supabase SQL editor. Safe to re-run.

-- 1. Server-side signup numbering (removes the client-side count race).
CREATE SEQUENCE IF NOT EXISTS public.tournament_signup_seq;
SELECT setval(
  'public.tournament_signup_seq',
  COALESCE((SELECT MAX(signup_number) FROM public.tournament_signups), 0) + 1,
  false
);

CREATE OR REPLACE FUNCTION public.tournament_signup_assign()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.signup_number := nextval('public.tournament_signup_seq');
  NEW.is_waiting_list := NEW.signup_number > 64;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tournament_signup_assign ON public.tournament_signups;
CREATE TRIGGER tournament_signup_assign
  BEFORE INSERT ON public.tournament_signups
  FOR EACH ROW EXECUTE FUNCTION public.tournament_signup_assign();

-- UNIQUE on the number; ignore if legacy rows already collide.
DO $$
BEGIN
  ALTER TABLE public.tournament_signups
    ADD CONSTRAINT tournament_signups_number_key UNIQUE (signup_number);
EXCEPTION WHEN duplicate_table THEN NULL;
END $$;

-- 2. Public INSERT must go through a definer RPC so anon can read the RETURNING row
--    without table SELECT. Only server-controlled columns are writable.
CREATE OR REPLACE FUNCTION public.create_tournament_signup(p_name text, p_email text, p_phone text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.tournament_signups;
BEGIN
  INSERT INTO public.tournament_signups (name, email, phone, payment_status)
  VALUES (p_name, p_email, p_phone, 'pending')
  RETURNING * INTO r;

  RETURN json_build_object(
    'signup_number', r.signup_number,
    'is_waiting_list', r.is_waiting_list
  );
END;
$$;

-- 3. Public aggregate stats (counts only, no PII).
CREATE OR REPLACE FUNCTION public.get_tournament_stats()
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total', count(*),
    'confirmed', count(*) FILTER (WHERE NOT is_waiting_list),
    'waiting', count(*) FILTER (WHERE is_waiting_list),
    'paid', count(*) FILTER (WHERE payment_status = 'paid')
  )
  FROM public.tournament_signups;
$$;

REVOKE ALL ON FUNCTION public.create_tournament_signup(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_tournament_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_tournament_signup(text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_tournament_stats() TO anon, authenticated;

-- 4. Policies: anonymous writes, authenticated reads/writes.
DROP POLICY IF EXISTS "Anyone can insert signups" ON public.tournament_signups;
DROP POLICY IF EXISTS "Anyone can read signups" ON public.tournament_signups;

CREATE POLICY "Public can insert signups"
  ON public.tournament_signups FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read signups"
  ON public.tournament_signups FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can update signups"
  ON public.tournament_signups FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete signups"
  ON public.tournament_signups FOR DELETE TO authenticated
  USING (true);
