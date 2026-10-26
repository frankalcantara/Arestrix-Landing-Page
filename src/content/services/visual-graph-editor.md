---
title: Visual graph editor
tags: canvas, templates, decisions, feedback loops
summary: Draw an agent pipeline on an Office-inspired canvas, then validate it before a single model call.
art: graph
order: 1
label: Design
deliverables:
  - Ribbon, templates and undo/redo
  - Decision vertices, tool nodes and feedback loops
  - Per-vertex provider, model and prompt settings
  - Graph validation that blocks incomplete runs
---

Pipelines are easier to reason about as a graph than as a stack of prompts. Arestrix puts the whole workflow on one canvas: agents, tools, decisions and the edges that connect them.

The canvas is inspired by the Office ribbon, so the first hour feels familiar. Templates give you a working starting point; an empty graph is one click away.

## What you can model

- Sequential chains, parallel branches and feedback loops
- Decision vertices that route the flow at runtime
- Agent, tool, MCP and subflow vertices in the same graph
- Generated forms for pipelines that need human input

## What is checked

Validation runs before execution: missing models, unresolved variables, unreachable vertices and cycles that cannot make progress are reported on the graph, not discovered halfway through a run.
