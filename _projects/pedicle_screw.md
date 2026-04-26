---
layout: page
title: Automated Pedicle Screw Trajectory Planning
description: Full thoracolumbar spine planning pipeline across 742 patient CT cases
img: assets/img/projects/pedicle.jpg
importance: 1
category: research
---

Designed and implemented a fully automated pedicle screw trajectory planning pipeline covering the complete thoracolumbar spine (T1–L5), processing 742 patient CT cases from the NMDID high-resolution dataset across 17 vertebral levels.

## Methods

- Applied Monte Carlo sampling with region-adaptive geometric constraints (entry/exit disk radius, cone angle, cortical clearance) and Euclidean Distance Transform-based voxelization; generated 23,000+ candidate trajectories with a **91.7% planning success rate** and **99.3% validation pass rate**.
- Integrated Statistical Shape Model (SSM) landmark annotations for per-vertebra path initialization; enforced surface-normal-based endplate filtering achieving **0% endplate violation** and median cortical clearance of 2.5–3.3 mm across all levels.
- Built a multi-stage batch pipeline (mesh QC → EDT cache → Monte Carlo planning → signed-distance validation) capable of running across all cases and vertebral levels on a single GPU workstation.

**Affiliation:** ARCADE Lab, Johns Hopkins University
**Advisor:** Prof. Mathias Unberath, Ph.D. Blanca Inigo Romillo
