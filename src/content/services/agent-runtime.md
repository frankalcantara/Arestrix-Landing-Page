---
title: Agent runtime
tags: tool loop, sandboxes, telemetry, batch resume
summary: Run the compiled pipeline with live telemetry, isolated tools and per-vertex model settings.
art: runner
order: 3
label: Run
deliverables:
  - Tool loop with sandboxed execution
  - Live thinking streams, latency and token throughput
  - Per-vertex provider, model and cost settings
  - Batch resume after a failure
---

Press F5 and the Studio compiles the graph, runs it and shows the pipeline working. Completed and active vertices, tool arguments, model output and timing arrive in the same view.

The runtime is built for the unglamorous part of agents: retries, failures, long batches and the question of what actually happened in a run.

## Built into the run

- Tool loops with Docker, WSL2 or local sandboxes
- Live telemetry per vertex: latency, throughput and reasoning stream
- Per-vertex model overrides and cost caps
- Batch resume from the last completed vertex
- Persistent sessions for MCP servers, including HTTP and per-server headers

## For operators

The same pipeline exports as a standalone runner with a focused progress screen, node indicators and iteration history, without exposing the Studio to the person running it.
