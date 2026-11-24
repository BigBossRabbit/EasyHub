# AltSports tournament signups — access model

**Status:** the Supabase project (`kfvgdegoxtnxhgclujut`) is paused, and the section is not in
active use. Nothing is broken by waiting: the gate says "not configured" and the entry form
errors visibly. When you resume, unpause the project first, then follow the setup below in
order. The migration is already in the repo — paste it into the SQL editor.


Front-end passphrases are gone. The gate is a real Supabase Auth session.

## Data model

| Role | INSERT | SELECT | UPDATE | DELETE |
|---|---|---|---|---|
| `anon` | via `create_tournament_signup()` | aggregate only, via `get_tournament_stats()` | no | no |
| `authenticated` (admin) | yes | all rows | yes | yes |

Signup numbers and the waiting-list flag are assigned by a `BEFORE INSERT` trigger using a
sequence, so concurrent submissions cannot collide and clients cannot forge either value.

Public routes never see PII: the entry form calls the definer RPC, the stats strip calls the
counts RPC.

## One-time setup

1. **Apply the migration.** SQL editor →
   `supabase/migrations/20261124000000_tighten_tournament_signups.sql`. Re-runnable. It
   drops the old public-read policy, so run it even though signups are paused.
2. **Create the admin user.** Authentication → Users → Add user. Confirm the email,
   set a strong password.
3. **Disable public sign-ups.** Authentication → Providers → Email → turn off "Allow new
   users to sign up". Otherwise anyone can mint an account that reads every row.
4. **Wire the build env.** `cp .env.example .env.local` and fill
   `VITE_SUPABASE_ANON_KEY` (Project Settings → API → `anon public`). The URL is already set.
   Without both values the admin gate says "Supabase is not configured" and the entry form
   throws. Env is inlined at build time, so rebuild after changing it.
5. **Verify from a terminal** with the anon key:

   ```bash
   # rows should be empty for anon
   curl -s "https://kfvgdegoxtnxhgclujut.supabase.co/rest/v1/tournament_signups?select=*" \
     -H "apikey: $ANON" -H "Authorization: Bearer $ANON"
   # aggregates should return counts
   curl -s -X POST "https://kfvgdegoxtnxhgclujut.supabase.co/rest/v1/rpc/get_tournament_stats" \
     -H "apikey: $ANON" -H "Authorization: Bearer $ANON" -H "Content-Type: application/json" -d '{}'
   ```

6. **Optional:** redeploy the `send-tournament-confirmation` edge function with its
   `RESEND_API_KEY` secret; the signup path already tolerates a missing email.

## Operations

- Admin: `/altsports/admin` → sign in → dashboard. "Sign out" clears the browser session.
- Create/remove admins in the dashboard. There is no sign-up UI by design.
- Deleting test rows now works (DELETE policy added). Before the migration it silently
  removed nothing.
