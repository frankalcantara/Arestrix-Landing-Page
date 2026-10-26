---
title: Native C++20 compiler
tags: generated source, Taskflow, MSVC, GCC/Clang
summary: The graph is translated into C++20 and compiled with Taskflow into parallel task DAGs. Inspect every line in Monaco.
art: code
order: 2
label: Compile
deliverables:
  - Generated C++20 source in Monaco
  - Parallel branches mapped to Taskflow tasks
  - Builds with MSVC, GCC 11+ or Clang 14+
  - Reuse of unchanged builds
---

Arestrix does not interpret the graph at runtime. It generates C++20 source and compiles it with Taskflow, so what you designed is what actually runs.

The generated project is ordinary code. Open it in the embedded Monaco editor, read it, diff it, or compile it outside the Studio with the same toolchain your team already uses.

## Why it matters

- The execution model is visible instead of hidden behind a runtime
- Parallel branches become real concurrent tasks
- A compiled pipeline starts without an interpreter or a package manager
- Unchanged builds are reused, so iteration stays fast

## Targets

The Studio runs on Windows and Linux. Programs generated from a graph currently target Windows; Linux is on the roadmap.
