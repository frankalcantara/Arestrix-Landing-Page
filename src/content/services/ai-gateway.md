---
title: Enterprise AI Gateway
tags: virtual keys, budgets, rate limits, audit
summary: An on-prem OpenAI/Anthropic-compatible proxy that keeps provider keys and enforces budgets.
art: shield
order: 6
label: Govern
deliverables:
  - OpenAI and Anthropic-compatible on-prem proxy
  - Virtual keys by key, project, user and provider
  - Budgets, rate limits and a usage ledger
  - Fail-closed routing; local models exempt
---

Once several runners share one provider bill, someone has to answer who spent what. The Arestrix AI Gateway sits between the runners and the providers, keeping the real keys on the server and issuing virtual keys with limits.

It is a separate on-prem executable, not a hosted service. The Studio and the exported runners talk to it through `ARESTRIX_AI_GATEWAY_URL` and a virtual key.

## What the gateway enforces

- Monthly budgets by key, project, user, provider and model
- Rate limits and a usage ledger
- Fail-closed routing when the gateway is required but missing
- `/v1/usage`, `/health` and Prometheus `/metrics`
- An immutable policy that can be locked through GPO or MDM

Local models and custom OpenAI-compatible servers stay direct and are exempt from gateway budgets.
