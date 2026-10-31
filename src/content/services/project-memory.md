---
title: Project memory
tags: SQLite, modes, proposals, hybrid retrieval
summary: Opt-in project memory with per-vertex modes, approved lessons and a token-budgeted brief.
art: layers
order: 5
label: Remember
deliverables:
  - Per-vertex off, consult and learn modes
  - Lessons and playbooks enter as proposals
  - Hybrid FTS and vector search over a fingerprinted index
  - Continuation state with scopes, schema, TTL and CAS
---

Agent runs produce more than output: they produce lessons. Arestrix can keep them in the project, in a local SQLite database that the next run consults.

Memory is opt-in. Every vertex is set to `off`, `consult` or `learn`, and a project default fills in whatever the vertex leaves alone.

The memory model is deliberately conservative. Proposals need evidence before they are promoted, consolidation is deterministic, and every entry keeps its provenance.

## How agents use it

- `consult` reads a token-budgeted brief: active lessons, linked facts and their evidence
- `learn` also records a success or failure episode and may propose a lesson
- `memory_propose_lesson` files a proposal; it never activates knowledge on its own
- Approved playbooks carry validated, reusable steps; the CLI can demote them with `memory unpromote`
- Declared state keys keep continuation data outside the brief, with JSON Schema, TTL and CAS

Knowledge lives in `.arestrix/memory/memory.db`; episodes, hits and token usage live in a separate telemetry database, so pruning telemetry never deletes what the project learned.
