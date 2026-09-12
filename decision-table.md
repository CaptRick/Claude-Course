# Decision Table — CCA-F

Every "use X when Y, not Z when W" rule you meet this week. This is your cheat sheet for scenario questions — the exam maps almost every stem onto a row like this.

Seeded from the roadmap's cheat sheet — add to this all week, don't just leave these:

| Situation (Y) | Use this (X) | Not this (Z) | Why |
|---|---|---|---|
| Predictable, high-volume, repeated task | Workflow | Agent | Agent adds cost, latency, nondeterminism for no gain |
| Need something to happen every time | Hook | Skill | Skills are model-invoked; the model may not invoke it |
| Context filling with exploration noise | Subagent | Inline summarizing | Junk still lives in main context otherwise |
| Model picks the wrong tool | Rewrite tool descriptions | Blame the model | Rarely a capability problem |
| Generated code needs review | Independent instance | Self-review | Self-review inherits the generator's reasoning bias |
| Large multi-file review | Per-file passes + integration pass | One giant pass | Dilutes attention, contradictory findings |
| Tool call fails | Return error as tool result | Throw | Throwing removes the model's chance to recover |
| `stop_reason: max_tokens` | Continue / raise cap | Treat as error | It's not an error |
| One-off internal function | Plain tool | MCP server | MCP is for reuse across clients, not everything |
| Same prefix on every request | Prompt caching, stable content first | Reorder for readability | Reordering kills the cache |
| Irreversible external action | Human-in-the-loop gate | Full autonomy | Autonomy is not free |
| System prompt is huge and static | Cache it | Re-send raw every time | Cost/latency |

---

<!-- New rules you meet this week go below -->
