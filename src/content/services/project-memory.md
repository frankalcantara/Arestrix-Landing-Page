---
title: Project memory
tags: SQLite, lessons, Blackboard, hybrid retrieval
summary: A temporal multigraph of project memory with episodes, lessons, proposals and a shared Blackboard.
art: layers
order: 5
label: Remember
deliverables:
  - SQLite temporal multigraph
  - memory_search and memory_record_lesson tools
  - Success and failure episodes with evidence-backed promotion
  - Shared Blackboard, playbooks and a token-budgeted brief
---

Agent runs produce more than output: they produce lessons. Arestrix keeps them in a local SQLite temporal multigraph that agents can search and update between runs.

The memory model is deliberately conservative. Proposals need evidence before they are promoted, consolidation is deterministic, and every entry keeps its provenance.

## How agents use it

- `memory_search` finds relevant lessons, episodes and playbooks
- `memory_record_lesson` writes a new lesson with its evidence
- Failure episodes keep the context of what went wrong
- A shared Blackboard coordinates agents inside one run
- Procedural playbooks turn repeated successes into reusable steps

## How it is kept honest

Records are injected and tracked when used, hybrid retrieval is optional, and a token-budgeted brief keeps memory from crowding out the actual task. Memory A/B in the Studio shows what changed when memory was enabled.
