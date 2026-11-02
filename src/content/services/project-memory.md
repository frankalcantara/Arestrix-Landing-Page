---
title: Project memory
tags: SQLite, knowledge graph, retrieval, approval gates
summary: An opt-in local knowledge graph with gated paths, hybrid retrieval and measured context savings.
art: layers
order: 5
label: Remember
deliverables:
  - Off, consult and learn modes per vertex
  - Lessons, claims and source passages in one local graph
  - Lenses, facets, canonical paths and bounded traversal
  - Lexical and vector retrieval with a fingerprinted index
  - Approval gates, evidence snapshots and separate telemetry
  - Continuation state with JSON Schema, TTL and CAS
---

Agent runs produce more than output: they produce evidence. Arestrix can keep that evidence in the project, in a local SQLite graph the next run consults.

Memory is opt-in. Every vertex is set to `off`, `consult` or `learn`, and a project default fills in whatever the vertex leaves alone. `consult` reads a token-budgeted brief; `learn` also records an episode and may propose knowledge.

## A graph, not a key-value store

A run can contribute at several levels:

- **Episodes** record the input, result, validation and hashes of a `learn` run.
- **Lessons** are rules proposed by the agent, or automatically when a task fails.
- **Sources and passages** are text, Markdown or code files ingested after execution, fingerprinted and segmented deterministically.
- **Claims** are subject, predicate and object facts extracted only from passages the run actually used.
- **Lenses and facets** give claims a perspective and build deterministic per-entity summaries.
- **Canonical paths** consolidate repeated traces. A path becomes active only after a configurable number of distinct validated inputs.
- **Playbooks** carry reusable steps and leave candidate state only after independent validation.
- **Continuation state** holds declared working values outside the brief, with JSON Schema, TTL and CAS.

Interdomain bridges remain hypotheses. They never become edges on their own.

## What a run reads

The brief is built at the start of the run inside `contextBudgetTokens`. Its query combines `taskType`, the theme and the vertex prompt template, never the user input text.

1. Active lessons for the theme, ordered by confidence and recency.
2. Active facts and claims linked to the theme and task queries.
3. Eligible active paths, when path serving is enabled; every claim must be active, valid and allowed by the access policy.
4. A bounded traversal pack when no path covers the query.
5. Evidence for the injected lessons and facts.
6. Declared working state only when the graph enables that block.

Search combines full-text search, optional vector search and reciprocal rank fusion. The vector index carries a fingerprint of the endpoint, model, revision, dimension and instructions; changing any of them marks the index stale and requires reindexing. Without an embedding provider, lexical search keeps working.

Every injected item is labelled `[MEMO:<id>]`. The runtime marks an item as used only when the agent cites its ID in the final answer. Search results that are returned but not cited are recorded as consulted, not used.

## How learning enters

A `learn` run writes an episode. From it, Arestrix may create a lesson proposal, an automatic failure proposal, or a playbook candidate.

Infrastructure failures are classified by an enumerated `errorClass` and do not create lesson proposals. `task_max_turns` is a task failure. Proposal text is normalized before deduplication, so identical failures with different IDs produce a single proposal.

Knowledge does not activate itself:

- proposals wait for approval in the Project Memory panel;
- playbooks need three distinct validated inputs among the last 20 validated runs, a stable validator and at most one promotion per task type in 24 hours;
- two consecutive failures or more than 30% failures in ten validated runs return a playbook to candidate;
- paths need distinct validated inputs before they can be served;
- every promotion and demotion writes an evidence snapshot that survives telemetry retention.

## Measured results

Two controlled tests run outside CI against the real DeepSeek API, with a token ceiling and a reproducible report. Both use the same fixture question and a fixed expected answer.

<div class="prose-table">
<table>
<caption class="sr-only">Measured memory results from controlled tests</caption>
<thead>
<tr><th scope="col">Test</th><th scope="col">Comparison</th><th scope="col">Result</th></tr>
</thead>
<tbody>
<tr><th scope="row">Long interaction</th><td>Memory off vs on, six writes and a final answer</td><td>Off answered <code>UNKNOWN</code> in 8 calls / 8,475 tokens. On answered <code>ORION-42</code> in 9 calls / 14,164 tokens.</td></tr>
<tr><th scope="row">Context substitution</th><td>Long manual in the prompt vs short prompt plus memory</td><td>24,718 vs 3,228 prompt tokens, an 87% reduction, with the same <code>ORION-42</code> answer.</td></tr>
<tr><th scope="row">Paired A/B pilot</th><td>20 tasks × 3 repetitions × 2 arms on frozen knowledge, deterministic provider</td><td>120 validated observations, with both arms writing telemetry to the same measurement database.</td></tr>
</tbody>
</table>
</div>

A paired A/B run is the gate for the experimental retrieval switches; this pilot exercises the harness. `pathServing`, `traversal`, `routing.mode` and `bridges` stay off by default until a real-data measurement shows a justified gain and a recorded cost. The reports and methodology are in the [memory v1.0.1 release](https://github.com/frankalcantara/Arestrix/releases/tag/memory-v1.0.1) and the [test strategy](https://github.com/frankalcantara/Arestrix/blob/main/docs/quality/memory-v1-test-strategy.md).

Memory reduces the static context a project must send. It does not yet compact the history of a long conversation automatically; that work is tracked in the project's memory pending list.

## Scope and limits

- Project knowledge, workspace knowledge and institutional knowledge are separate scopes. A project does not read another project's memory by default.
- Telemetry lives in its own SQLite database. Pruning episodes, hits or usage never deletes knowledge.
- Known secrets are removed before any write, legacy read or export.
- Continuation-state reads are labelled as untrusted data from a previous run; writes are audited and use compare-and-swap.
- Arestrix is a local desktop studio, not a hosted memory service. There is no cloud dependency.
- The Studio shows proposals, state keys, playbooks and retrieval status in the Project Memory panel. The same operations are available through `arestrix-cli memory`.
