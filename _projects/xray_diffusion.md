---
layout: page
title: Action-Conditioned Intraoperative X-ray View Prediction
description: Conditional diffusion model for surgical view planning under C-arm guidance
img: assets/img/projects/diffusion.jpg
importance: 2
category: research
---

Built an observation prediction module for closed-loop surgical view planning: given a current fluoroscopy image and a candidate 6-DoF C-arm motion, a conditional diffusion model (DDPM training / DDIM inference) predicts the X-ray at the resulting viewpoint as a visual preview for a downstream VLM (MedGemma).

## Methods

- Constructed a DRR training dataset from 827 CT volumes using DeepDRR, sampling 100 poses per case (5 vertebra centers × 20 angles spanning AP/lateral/oblique) and filtering ~1,500 training pairs per case by angular and translation distance thresholds.
- Designed a U-Net backbone with cross-attention for source image conditioning and AdaGroupNorm for injecting a 9-D relative pose embedding (6D rotation + 3D translation).
- Trained with DDPM training / DDIM inference using mixed-precision (fp16) on an RTX 3090.

**Affiliation:** ARCADE Lab, Johns Hopkins University
**Advisor:** Prof. Mathias Unberath, Ph.D. Blanca Inigo Romillo
