---
layout: page
title: Automated Pedicle Screw Trajectory Planning
description: Automated T1–L5 trajectory planning across 742 CT-derived spine models
img: assets/img/projects/pedicle.jpg
importance: 1
category: research
---

Designed and implemented an automated pedicle screw trajectory planning pipeline for the thoracolumbar spine (T1–L5, 17 vertebral levels). The pipeline generated more than 23,000 candidate trajectories from 742 CT-derived spine models built from the NMDID high-resolution CT dataset.

**Period:** Jan–Mar 2026  
**Affiliation:** ARCADE Lab, Johns Hopkins University  
**Advisor:** Prof. Mathias Unberath · **Research mentor:** Blanca Íñigo

## Methods

- Monte Carlo sampling of candidate trajectories under geometric constraints (entry/exit disk radius, cone angle, cortical clearance) adapted to four anatomical regions of the spine.
- Per-vertebra path initialization from Statistical Shape Model (SSM) landmark annotations.
- Surface normals used to exclude trajectories that cross a vertebral endplate; a Euclidean distance transform (EDT) used to compute bone clearance.
- A multi-stage batch pipeline (mesh quality checks → EDT cache → Monte Carlo planning → signed-distance validation) that runs across all cases and vertebral levels on a single GPU workstation, with trajectories exported for inspection in 3D Slicer.

## Results

- **91.7%** planning success rate and **99.3%** validation pass rate.
- No endplate violations.
- Median cortical clearance of 2.5–3.3 mm across vertebral levels.
