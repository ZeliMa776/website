---
layout: page
title: "WearWise — AI Outfit Recommendation"
description: Personal cloud wardrobe with AI-powered outfit recommendations and virtual try-on
img: assets/img/projects/wearwise.jpg
importance: 4
category: course
tags: [TypeScript, React, Express, MongoDB, Gemini, Cloudflare R2]
---

**Live site:** [wearwise-cs423.web.app](https://wearwise-cs423.web.app/)

WearWise is a personal cloud clothing library where users upload wardrobe 
photos and receive AI-powered outfit recommendations based on weather, 
occasion, and personal style, with virtual try-on image generation.

## AI Recommendation Engine

- Designed a multi-section system prompt architecture 
  (`buildWardrobeSystemMessage()`) injecting user wardrobe (item IDs, 
  categories, tags, descriptions), profile data, weather conditions, and 
  ISO-timestamped message history into the LLM context.
- Engineered a full vote → style summary → recommendation preference loop; 
  extracted attribute-level style patterns (e.g. "prefers casual cotton, 
  dislikes formal") via Gemini summarization and injected active styleNote 
  application rules into the system prompt.

## Weather & Occasion Awareness

- Designed a four-step inference chain (location → weather → local time → 
  occasion) with graceful degradation at every failure boundary.
- Decoupled timezone from geolocation by independently sending 
  `Intl.DateTimeFormat().resolvedOptions().timeZone`, preventing location 
  permission denial from breaking time-aware logic.
- On location failure, checks conversation history for a previously 
  mentioned city name; if found, infers IANA timezone and proceeds to 
  weather; if not, prompts the user once combining city and occasion into 
  a single question to avoid sequential interrogation.
- Fixed a boundary-condition bug where location presence was incorrectly 
  used as a proxy for timezone availability, causing the weather step to 
  be skipped when only timezone (not full location) was available.

## Streaming & Validation

- Refactored batch recommendation delivery into a `submit_outfit` tool 
  call pattern where each call emits a dedicated SSE event, enabling 
  incremental card rendering with skeleton animation and ThinkingDots 
  transitions.
- Built dual-validation in `submit_outfit` (invalid item ID interception + 
  duplicate category rejection with LLM auto-retry); excluded accessories 
  from uniqueness constraints to allow multiple accessories per outfit.
- Implemented safe fake-streaming text pipeline: buffered LLM output, 
  regex-filtered leading timestamps, replayed as fake streaming 
  (3 chars/chunk, 15ms delay) to preserve typewriter UX while preventing 
  internal reasoning leakage.

## Engineering

- Contributed **40+ PRs** across 4 iterations with backend integration 
  tests, frontend E2E tests, and service-level unit tests; participated 
  in code review and CI/CD maintenance.

**Course:** Software Engineering (CS423), Johns Hopkins University
