---
title: Local AI models
tags: llama.cpp, GGUF catalog, CPU fallback
summary: Run models on your own machine with a managed llama.cpp runtime and hardware-aware recommendations.
art: chip
order: 4
label: Run local
deliverables:
  - Managed llama.cpp runtime with SHA-256 verification
  - Pre-approved GGUF model catalog
  - Hardware-aware model recommendation
  - Vulkan backend with CPU fallback
---

Not every prompt should leave the machine. Arestrix can download, verify and start a pinned llama.cpp runtime, then point a pipeline at it without writing environment files by hand.

No model weights are distributed with the product. The catalog pins official sources, sizes, licenses and checksums; downloads are verified before they are used.

## What the Studio manages

- RAM, CPU and GPU detection with a recommended model
- Resume-aware downloads with SHA-256 verification
- Vulkan by default, with CPU fallback when the GPU path fails
- A local server bound to 127.0.0.1 with an ephemeral per-run key
- Cleanup when the Studio exits

## Bring your own server

Ollama, LM Studio, llama.cpp and vLLM are supported through any OpenAI-compatible endpoint. The address stays on the machine and is never written into the project.
