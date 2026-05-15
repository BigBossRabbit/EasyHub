# Codex App-Server Runtime — Should We Turn This On?

**Assessment for:** OKIN Trading Enterprise 4-profile team workflow (Orchestrator / Alan / Mira / Turing)  
**Current setup:** macOS, claude-opus-4.7 via custom provider, heavy use of `delegate_task`, skills, terminal, browser, image generation  
**Date:** 2026-05-14  
**Source:** [Hermes docs — Codex App-Server Runtime](https://hermes-agent.nousresearch.com/docs/user-guide/features/codex-app-server-runtime)

---

## 1. What Is It? (Plain English)

The Codex App-Server Runtime is an opt-in mode where Hermes hands the actual AI "turn" (thinking + tool execution) to OpenAI's Codex CLI subprocess instead of running its own tool loop. Codex handles terminal commands, file edits, and sandboxing natively via JSON-RPC, while Hermes stays as the outer shell providing session history, slash commands, memory/skill review, and its richer tools (browser, vision, image gen) via an MCP callback. The key trade: you get Codex's sandboxed execution environment and can use your **ChatGPT subscription** for LLM calls instead of paying per-API-token — but you lose access to tools that need Hermes' agent loop context.

---

## 2. What It Unlocks That You Can't Do Today

- **ChatGPT subscription billing** — Run OpenAI model turns against your ChatGPT Pro/Team subscription (no API key needed). Could reduce costs if you're paying per-token for OpenAI models today.
- **Codex sandbox** — Commands run inside seatbelt/landlock sandboxing with permission profiles (`:read-only`, `:workspace`, `:danger-no-sandbox`). Safer execution than bare `terminal()`.
- **Native Codex plugins** — Access Linear, GitHub, Gmail, Google Calendar, Canva, and other Codex marketplace plugins directly from your Hermes sessions. Auto-migrated from your Codex CLI install.
- **Codex's `apply_patch`** — Structured multi-file diff tool native to Codex (different from Hermes' `patch` tool).
- **Codex's `update_plan`** — In-runtime planning/todo tracker managed by Codex.
- **Codex's `view_image`** — Load local images directly into the conversation context.
- **Kanban workers on Codex runtime** — Workers inherit the runtime and can use Codex tools + report back via MCP callback kanban tools.

---

## 3. What It Does NOT Do (Common Misconceptions)

- **Does NOT give you `delegate_task`** — This is the deal-breaker for your workflow. Subagent delegation (spawning Alan, Mira, Turing from Orchestrator) is **unavailable** on this runtime. It requires the running AIAgent context that a stateless MCP callback can't provide.
- **Does NOT give you `memory`, `session_search`, or `todo`** — Same reason. These Hermes-native tools need the agent loop.
- **Does NOT work with non-OpenAI providers** — It's scoped to `openai/` and `openai-codex/` turns only. Your **claude-opus-4.7 via custom provider cannot use this runtime**.
- **Does NOT auto-share auth** — You need separate `codex login` AND `hermes auth login codex`. Two auth sessions.
- **Does NOT change anything by default** — Purely opt-in. Hermes never auto-routes you.
- **Does NOT replace Hermes' tools** — Browser automation, web search, image gen, skills, and TTS still work via the MCP callback. But they're invoked differently (Codex spawns a subprocess).

---

## 4. Setup Cost

| Step | Effort |
|------|--------|
| Install Codex CLI (`npm i -g @openai/codex`) | 1 min |
| Run `codex login` (OAuth) | 2 min |
| Optionally install Codex plugins (`codex plugin marketplace add openai-curated`) | 5 min |
| Run `/codex-runtime codex_app_server` in Hermes | 1 min (auto-migrates MCP servers, plugins, registers callback) |
| Per-profile Codex isolation (optional, for 4-profile setup) | Set `CODEX_HOME` per profile + re-run `codex login` per profile |

**Total:** ~10 minutes for basic setup. Reversible with `/codex-runtime auto`.

---

## 5. For THIS User's Setup — Is It Worth Turning On?

### Score: 3/10 — **Not recommended right now.**

**Justification:**

1. **`delegate_task` is your core workflow and it's unavailable.** Your entire 4-profile team architecture (Orchestrator delegates to Alan for research, Mira for writing, Turing for engineering) depends on `delegate_task`. This tool flatly does not work on the Codex runtime. Enabling it globally would break your Orchestrator → subagent pipeline.

2. **You use claude-opus-4.7 via a custom provider, not OpenAI.** The Codex runtime only works with OpenAI/Codex-scoped models. You'd have to switch your entire model stack to OpenAI to use it. This is a fundamental incompatibility with your current setup.

3. **`memory` and `session_search` are unavailable.** Your team profiles likely rely on persistent memory across sessions. Losing these degrades continuity for long-running business operations (marketing campaigns, web-dev project tracking).

4. **The sandboxing benefit is marginal for your workflow.** You're deploying to GitHub Pages and Supabase — your terminal use is builds/deploys, not untrusted code execution. The sandbox adds friction (approval prompts) more than protection for your use case.

5. **The billing advantage doesn't apply.** You're already on a custom provider (not paying OpenAI per-token), so the "use your ChatGPT subscription" value prop doesn't save you money.

6. **Native Codex plugins (Gmail, Calendar, GitHub) are nice-to-have but not critical.** These could help with business operations, but you can achieve similar results with browser automation and MCP servers you already have.

**The one scenario where it could help:** If you set it up on a *single profile* (e.g., Turing for pure engineering tasks where delegation isn't needed) and switched your model to OpenAI for that profile only. But the complexity outweighs the benefit given your current provider choice.

---

## 6. Alternatives That Deliver More Value

Given your 4-profile marketing + web-dev workflow, these Hermes features would yield higher ROI:

| Feature | Why It Fits |
|---------|------------|
| **Kanban (Multi-Agent Board)** | Structured multi-agent task dispatch with worker lanes — a more formalized version of your delegate_task workflow. Workers can run in parallel. Your Orchestrator creates tasks, Alan/Mira/Turing pick them up. |
| **Persistent Goals (`/goal`)** | Long-running campaign objectives that survive across sessions. Great for "launch marketing campaign by Friday" type workflows. Works on your current runtime. |
| **Event Hooks** | Auto-trigger actions on session events (e.g., auto-deploy after Turing finishes a build, auto-notify after Mira completes copy). |
| **Batch Processing** | Run the same operation across multiple files/items — useful for bulk content generation, image processing across product lines. |
| **Cron (Scheduled Tasks)** | Automate recurring business operations (daily reports, weekly content audits, scheduled deploys). |

**Bottom line:** Keep the default Hermes runtime. Your `delegate_task` + multi-profile team + Claude via custom provider stack is well-suited to Hermes' native tool loop. The Codex runtime solves a different user's problem (OpenAI-only, single-agent, subscription-billing).
