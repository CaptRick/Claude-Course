# CCA-F 7-Day Battle Plan
**Claude Certified Architect – Foundations | Adnan | Target: 720/1000**

---

## The exam you are actually sitting

| Fact | Detail |
|---|---|
| Questions | 60, multiple-choice, **scenario-based** |
| Time | 120 minutes (= 2 min/question) |
| Pass mark | 720 / 1000 |
| Scenarios | 4 of 6 pulled at random per exam |
| Delivery | Proctored, Pearson VUE |
| Validity | 12 months, free renewal if done on time |

**Domain weights — study time follows this table, not your interest:**

| # | Domain | Weight | Questions (approx) | Your hours |
|---|---|---|---|---|
| D1 | Agentic Architecture & Orchestration | 27% | ~16 | 9–10 |
| D3 | Claude Code Configuration & Workflows | 20% | ~12 | 7 |
| D4 | Prompt Engineering & Structured Output | 20% | ~12 | 7 |
| D2 | Tool Design & MCP Integration | 18% | ~11 | 6 |
| D5 | Context Management & Reliability | 15% | ~9 | 5 |

**Total: 34–35 hours over 7 days ≈ 5 hours/day.**

> If you can only do 3 hrs/day, run this over 12 days instead: split Days 1, 2, 3 and 4 into two half-days each. Do NOT compress by skipping the hands-on blocks. Skip the reading instead — you can pass on hands-on + practice questions, you cannot pass on reading alone.

---

## Daily structure (use this shape every single day)

| Block | Time | What |
|---|---|---|
| A — Input | 90 min | Read/watch the day's material. Notes in your own words only. |
| B — Build | 120 min | The day's hands-on deliverable. Code that runs. |
| C — Drill | 60 min | 25–30 practice questions on today's domain |
| D — Wrong-answer log | 30 min | Write up every miss. Why right wins, why yours loses. |

Take Block D seriously. It is the highest-value 30 minutes of your day.

---

## Before Day 1 — 45 minutes, do this tonight

1. **Confirm you can actually register.** Certification runs through the Claude Partner Network / Anthropic Partner Academy, booked via Pearson VUE. Request access and check slot availability *before* investing the week. If booking takes 2 weeks, your plan changes.
2. **Download the official Exam Guide PDF (v1.0, effective July 2026).** The March 2026 launch guide is superseded — make sure you have the right one.
3. **Create two files you will use all week:**
   - `wrong-answers.md` — your Block D log
   - `decision-table.md` — every "use X when Y, not Z when W" rule you meet
4. **Set up a working sandbox:** a folder, `ANTHROPIC_API_KEY` in env, Python or Node SDK installed, Claude Code installed. Don't burn Day 1 on setup.

---

# DAY 1 — Agentic Architecture, Part 1 (5h)
### D1 is 27% of the exam. Two days on it. This is the day that matters most.

**Block A — Input (90 min)**

Read in this order:
1. The official exam guide, cover to cover. All five domains. You're building a map, not memorizing.
2. Anthropic's "Building Effective Agents" research post. **Read it twice.** Roughly a third of D1 comes straight out of the thinking in this post.

Concepts to nail today:
- **What makes a system "agentic":** autonomy over control flow + tool use + a loop that decides when it's done.
- **The agentic loop:** gather context → take action → verify result → repeat. Know each stage and what fails at each stage.
- **The three-way distinction:** conversational system vs. workflow vs. agent.
  - Workflow = *you* define the steps, the model fills in the steps.
  - Agent = *the model* decides the steps.
- **Workflow patterns:** prompt chaining, routing, parallelization (sectioning vs. voting), orchestrator-workers, evaluator-optimizer.
- **When agentic is the WRONG answer.** Memorize this: if the task is predictable, high-volume, latency-sensitive, or cost-sensitive, a fixed workflow beats an agent. The exam loves punishing the candidate who reaches for an agent by reflex.

**Block B — Build (120 min)**

Write a bare agent loop by hand. No framework, no SDK abstraction:

```
while True:
    response = call_api(messages, tools)
    if response.stop_reason == "end_turn": break
    if response.stop_reason == "tool_use":
        result = execute(tool_call)
        messages.append(assistant_turn)
        messages.append(tool_result_turn)
```

Give it two tools (a fake "search" and a fake "calculator"). Make it complete a 3-step task. Then deliberately break it:
- Return an error from a tool. What happens?
- Return garbage from a tool. Does the model recover?
- Remove the loop-exit condition. Watch it spin.

You now understand the agentic loop better than someone who read about it for 6 hours.

**Block C + D — Drill & log (90 min)**
30 questions on D1. Log every miss.

**End-of-day self-check — answer out loud, no notes:**
1. Give me two scenarios where a workflow beats an agent, and say why.
2. What are the three stages of the agentic loop and what breaks at each?
3. What's the difference between parallelization-sectioning and parallelization-voting?
4. A team wants an agent to process 50,000 invoices/day with a fixed schema. What do you tell them?

---

# DAY 2 — Agentic Architecture, Part 2 (6h)
### Orchestration and multi-agent. The heaviest scenario material.

**Block A — Input (120 min)**

- **Orchestration patterns:** single agent, orchestrator + workers, **hub-and-spoke coordination**, sequential handoff.
- **Subagents and why they exist:** context isolation. A subagent runs with a clean context, does focused work, returns a *summary*. The exploration junk never pollutes the main context. This is the #1 reason to spawn one.
- **When NOT to go multi-agent:** coordination overhead, cost multiplication, latency stacking, and the fact that agents can't see each other's context. Single agent with good tools beats a badly-split multi-agent system almost every time.
- **Model selection as an architecture decision:** cheap/fast model for exploration and routing, capable model for the reasoning that matters. Know that mixing tiers within one system is a legitimate and often correct answer.
- **Human-in-the-loop:** where to place approval gates, and which actions are irreversible enough to require one.
- **Cost, latency, and reliability tradeoffs.** For every pattern, be able to say what it costs you.

**Block B — Build (150 min)**

Extend yesterday's loop into an orchestrator:
- One "lead" that decomposes a task into 3 subtasks.
- Three "worker" calls, each with its own fresh message list.
- The lead receives only the workers' summaries, never their full transcripts.

Then measure: token count and wall-clock time for the multi-agent version vs. doing it in one agent. **Write the two numbers down.** That comparison is a scenario question waiting to happen.

**Block C + D — Drill & log (90 min)**
30 more D1 questions.

**End-of-day self-check:**
1. Why does a subagent's isolated context matter more than its "specialization"?
2. Name three costs of going multi-agent.
3. When is hub-and-spoke the right shape, and when is sequential handoff better?
4. Where would you put a human approval gate in a system that sends customer emails?

---

# DAY 3 — Claude Code Configuration & Workflows (6h)
### 20%. You must have actually run it. Reading will not carry you here.

**Block A — Input (120 min)**

Work through the Claude Code docs (`code.claude.com/docs`) hands-on-while-reading:

- **CLAUDE.md / memory:** project conventions and always-on context. Key exam fact: CLAUDE.md files are **additive** — all levels contribute to context at once. Files from the working directory upward load at launch; subdirectory files load as you work in them. Conflicts get reconciled by judgment, more specific usually wins.
- **The extension layer and what each piece is for:**

  | Feature | Use it for |
  |---|---|
  | CLAUDE.md | Always-on project context |
  | Skills | On-demand knowledge and repeatable workflows |
  | Subagents | Context isolation, parallel work |
  | Hooks | Automation that must fire **every** time, regardless of model behavior |
  | MCP | Connecting external services and data |
  | Plugins | Packaging all of the above for reuse/distribution |

  Learn to pick between these instantly. It is a guaranteed question shape: *"the team needs X to happen on every commit — skill or hook?"* Answer: hook, because hooks are deterministic and skills are model-invoked.

- **Precedence rules — memorize these, they're cheap marks:**
  - Skills override by name: managed > user > project
  - Subagents: managed > CLI flag > project > user > plugin
  - MCP servers: local > project > user
  - Hooks **merge** — every registered hook fires for its matching event, from every source
- **Hooks in detail:** handler types are shell command, HTTP endpoint, MCP tool call, LLM prompt, and subagent. Know the lifecycle events and matchers conceptually.
- **Settings & permissions:** `settings.json` scopes, allow/deny rules, why permission config is a security control not a convenience.
- **Claude Agent SDK** (renamed from "Claude Code SDK" — the exam guide uses the new name). Overview, the agent loop it implements, headless mode, and loading Claude Code features into SDK agents.

**Block B — Build (150 min)**

In a throwaway repo:
1. Write a real `CLAUDE.md` with conventions.
2. Add a custom slash command.
3. Add a hook that runs a linter or a shell echo after every file edit. Confirm it fires.
4. Define a subagent with a narrow job and invoke it.
5. Connect one MCP server (filesystem or GitHub) and use it.
6. Run one task in headless mode.

All six. Tick them off.

**Block C + D — Drill & log (90 min)**

**End-of-day self-check:**
1. Hook vs. skill vs. subagent — one sentence each on when to reach for it.
2. Two CLAUDE.md files conflict. What happens?
3. Same MCP server name defined at local and user scope. Which wins?
4. You need a security rule that the model cannot talk its way around. Which feature?

---

# DAY 4 — Prompt Engineering & Structured Output (6h)
### 20%. Your API experience gives you a head start here — use it.

**Block A — Input (120 min)**

- **System prompt design:** role, constraints, output contract, examples. Where instructions belong (system vs. user vs. tool description) and why that placement changes behavior.
- **Structured JSON output:** how to force it, how to validate it, and — the exam's favourite — **what you do when it comes back malformed.** Retry with the parse error fed back is usually the right answer over "just retry" or "use regex to fix it."
- **Prefill and stop sequences** as output-shaping tools.
- **Extended thinking:** what it's for, what it costs, and when it's *not* worth it. Know that thinking blocks are bound to the model and history that produced them — you can't freely transplant them.
- **Multi-pass review loops.** Big one. The principle to memorize: *a model that generated something retains its own reasoning context and is therefore bad at critiquing it.* An **independent instance with no prior reasoning context** catches more. For large reviews, split into per-file local passes plus separate cross-file integration passes, to avoid attention dilution and contradictory findings.
- **Examples / few-shot:** how many, how to choose them, when they hurt.

**Block B — Build (150 min)**

1. Build a function that gets strict JSON back against a schema you define. Make the API return it reliably.
2. Now build the failure path: feed it input designed to produce invalid JSON, catch the parse error, and retry by showing the model its own error. Cap the retries.
3. Build a two-instance review: instance A writes a function, instance B — with **no** knowledge of A's reasoning — reviews it. Compare against A self-reviewing. Note the difference.

**Block C + D — Drill & log (90 min)**

**End-of-day self-check:**
1. Why is self-review weaker than independent review?
2. Your JSON parse fails 5% of the time in production. Three options, ranked.
3. When is extended thinking a bad architectural choice?
4. A 40-file code review keeps producing contradictory findings. Diagnose and fix.

---

# DAY 5 — Tool Design & MCP Integration (5h)
### 18%. Shorter day, dense facts.

**Block A — Input (105 min)**

- **Tool schema design:** name, description, `input_schema`. The exam's core insight: **the tool description is a prompt.** Most tool-use failures are description failures, not model failures. Vague descriptions, overlapping tools, and too many tools are the classic anti-patterns.
- **Stop reasons — know every one cold:**

  | `stop_reason` | Meaning | What you do |
  |---|---|---|
  | `end_turn` | Model finished naturally | Loop exits |
  | `tool_use` | Model wants a tool | Execute, append result, loop again |
  | `max_tokens` | Hit the output cap | Continue or raise the cap — **not** an error |
  | `stop_sequence` | Hit your stop string | Handle per design |
  | `pause_turn` | Long-running turn paused | Pass the response back to continue |
  | `refusal` | Model declined | Do not retry blindly |

  Misreading `max_tokens` as a failure, or not branching on `tool_use`, are both classic wrong answers.
- **`tool_choice`:** `auto`, `any`, `tool`, `none`. Know what each forces and what forcing costs you.
- **Parallel tool calls** — multiple `tool_use` blocks in one response. You must return **all** corresponding `tool_result` blocks. Know the sequencing rules.
- **Tool errors:** return an error as a tool result so the model can recover, versus throwing. Nearly always: return it.
- **MCP:** what the protocol is, client/server/transport, tools vs. resources vs. prompts. Crucially: **when to build an MCP server versus just defining an API tool.** MCP wins on reuse across clients and standardized integration; a one-off internal function does not need a server. The exam will offer you MCP as an over-engineered trap answer.

**Block B — Build (120 min)**

1. Two tools with deliberately overlapping descriptions. Watch the model pick wrong. Fix the descriptions. Watch it pick right. This exercise alone is worth several marks.
2. Handle a parallel tool-call response correctly.
3. Return a tool *error* and confirm the model recovers.
4. Connect a public MCP server to Claude Code and use it.

**Block C + D — Drill & log (75 min)**

**End-of-day self-check:**
1. Recite all six stop reasons and your handling for each.
2. Model keeps calling the wrong one of two similar tools. First thing you change?
3. Internal-only lookup used by one app. MCP server or plain tool? Defend it.
4. What must you return after a parallel tool call?

---

# DAY 6 — Context Management & Reliability + FIRST MOCK (6h)
### 15% domain, then the real test of where you stand.

**Block A — Input (105 min)**

- **Context window economics:** what fills it (system prompt, history, tool results, file reads), and why quality degrades as it fills. Tool results are usually the hidden hog.
- **Strategies:** compaction/summarization, context editing, retrieval instead of stuffing, subagent offloading, chunking.
- **Prompt caching:** what's cacheable, where the cache breakpoint goes, why *stable content must come first* in your prompt. Cost and latency implications.
- **Reliability:** retries with backoff, idempotency, timeouts, partial failure, graceful degradation, what to do when a tool is down.
- **Long-running agents:** checkpointing, resumption, budget/step caps so an agent can't loop forever.
- **Observability:** what to log — stop reasons, token counts, tool call sequences, failure modes.

**Block B — MOCK EXAM #1 (120 min, strict)**

Full 60 questions. Phone away. Timer on. No notes. No pausing.

**Block C — Score and diagnose (135 min)**

Score by domain. Fill this in:

| Domain | Score | Gap to 72% |
|---|---|---|
| D1 (27%) | | |
| D2 (18%) | | |
| D3 (20%) | | |
| D4 (20%) | | |
| D5 (15%) | | |

Then write up **every single miss** in `wrong-answers.md`. For each: the correct answer, why it wins, why yours loses, and which concept you were missing.

**Reality check on your score:**
- **75%+** — you're in good shape. Day 7 is polish.
- **60–74%** — normal at this point. Day 7 targeted revision should close it.
- **Under 60%** — do not sit the exam this week. Take the same plan over 2 more weeks. Failing costs you more time than postponing.

---

# DAY 7 — Targeted Revision + MOCK #2 (5h)
### Nothing new is learned today. Today you close gaps.

**Block A — Weak-domain assault (120 min)**
Take your two lowest-scoring domains from yesterday. Re-read only those sections. Re-do the drills you got wrong. Nothing else.

**Block B — MOCK EXAM #2 (120 min, strict)**
Different question bank if you have one.

**Block C — Final pass (60 min)**
- Re-read the official exam guide's domain list one last time and confirm you have an opinion on every bullet.
- Read your `decision-table.md` end to end.
- Read your `wrong-answers.md` end to end.
- Stop. Sleep properly. Do not cram the morning of.

---

## The cheat sheet — decision rules that answer most scenario questions

Memorize these. They map onto question stems almost one-to-one.

| Situation | Right answer | Why the obvious choice is wrong |
|---|---|---|
| Predictable, high-volume, repeated task | Workflow, not agent | Agent adds cost, latency, and nondeterminism for no gain |
| Need something to happen every time | Hook | Skills are model-invoked; the model may not invoke it |
| Context filling with exploration noise | Subagent | Summarizing in-line still leaves the junk in context |
| Model picks the wrong tool | Rewrite the tool descriptions | It's rarely a model capability problem |
| Generated code needs review | Independent instance | Self-review inherits the generator's reasoning bias |
| Large multi-file review | Per-file passes + integration pass | One giant pass dilutes attention |
| Tool call fails | Return the error as a tool result | Throwing removes the model's chance to recover |
| `stop_reason: max_tokens` | Continue / raise cap | It's not an error |
| One-off internal function | Plain tool | MCP is for reuse across clients, not everything |
| Same prefix on every request | Prompt caching, stable content first | Reordering for readability kills the cache |
| Irreversible external action | Human-in-the-loop gate | Autonomy is not free |
| System prompt is huge and static | Cache it | |

---

## Exam-day tactics

- 60 questions / 120 minutes = **2 minutes each.** Scenarios are long. Read the *question* before the *scenario* so you know what you're hunting for.
- Flag and move at 2:30 on any question. Come back. Never let one scenario eat five minutes.
- Look for the constraint in the stem: cost, latency, volume, compliance, reversibility. **The constraint picks the answer.** Two options will be technically workable and only one respects the constraint.
- Beware the over-engineered distractor. Multi-agent, MCP server, and extended thinking are all offered as traps when a simpler thing is correct.
- Beware the under-engineered one too: "just retry" and "just increase the context window" are usually wrong.
- No blanks. There's no negative marking.

---

## Resources

**Official**
- CCA-F Exam Guide PDF, v1.0 (effective July 2026) — your single source of truth on scope
- Anthropic Academy / Skilljar: "Building with the Claude API", "Introduction to Agent Skills" (free)
- Claude API docs: `platform.claude.com/docs` (also `docs.claude.com`)
- Claude Code docs: `code.claude.com/docs`
- Agent SDK overview: `code.claude.com/docs/en/agent-sdk/overview`
- MCP: `modelcontextprotocol.io`
- Anthropic research: "Building Effective Agents"

**Community (unofficial, verify against the guide)**
- freeCodeCamp full CCA-F prep course on YouTube (Andrew Brown) — implementation-heavy
- `github.com/dnacenta/claude-certified-architect` — all 5 domains, anti-patterns, practice questions
- CertSafari CCAR-F question bank — ~480 practice questions with rationales
- claudecertificationguide.com — free mock exams matching the blueprint

> Docs note: Anthropic split its documentation in July 2026. Old `docs.anthropic.com/en/docs/*` links still redirect. The SDK is now the **Claude Agent SDK**, not the Claude Code SDK — use the new name.

---

## What I need from you

- After Day 2: tell me how the multi-agent vs. single-agent token comparison came out.
- After Day 3: tell me which of the six Claude Code tasks you couldn't get working.
- After Day 6: **your per-domain mock score.** I'll rewrite Day 7 around it.

Bring me your wrong-answer log any day and I'll work through the reasoning with you.
