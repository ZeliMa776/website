---
layout: page
title: "M — Café Social Robot"
description: GPT-4o powered social robot for emotional companionship in real café environments
img: assets/img/projects/coffee_robot.jpg
importance: 3
category: course
tags: [GPT-4o, Python, ROS2, Docker, Whisper, Co-design]
---

Designed and deployed a GPT-4o powered social robot for a real café 
environment, focused on emotional companionship and natural conversation 
beyond transactional interactions.

## System Architecture

- Built a full conversational pipeline with intent classification 
  (SMALL_TALK / TASK_ORDER / TASK_RECOMMEND / TASK_ROBOT), camera-based 
  emotion monitoring, STT/TTS voice interface, and ROS2 physical robot 
  control, containerized with Docker.

## Iterative Co-design

- Led two rounds of iterative co-design: recruited participants for 
  in-situ sessions, transcribed interactions via Whisper API, and 
  extracted design requirements through dialogue log analysis and 
  post-session interviews for longitudinal comparison.

## LLM Behavior Engineering

- Identified and resolved core LLM behavioral failures — topic anchoring 
  toward coffee, emotion-triggered drink pushing, and generic follow-ups — 
  via systematic prompt redesign and 5 BAD/GOOD few-shot example pairs 
  injected into the system prompt.
- Implemented a context-aware drink recommendation mode (TASK_RECOMMEND) 
  grounded in conversational context (emotional state, fatigue, stated 
  preferences), with a state machine for multi-turn coherence.

## Results

- Achieved confirmed improvement across **8 behavioral dimensions** in 
  Iteration 2; both participants reported natural interaction without 
  adapting their communication style to the robot.

**Course:** Human-Robot Interaction (EN601.691), Johns Hopkins University
