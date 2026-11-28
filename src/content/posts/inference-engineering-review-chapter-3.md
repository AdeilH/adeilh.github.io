---
title: "Inference Engineering: Review Chapter 3"
description: "Inference Engineering: Review Chapter 3"
pubDate: 2026-11-28
tags: []
draft: false
audio: true
---

This chapter talks about hardware used for inference it starts off
with mentioning that nvidia is the industry leader in hardware for inference.
Datacenter, Workstations, Personal Gpus and how to access them like cloud,
on-prem, air gapped(physical access).

Then it talks about architecture difference between cpu and gpu like cpus
are more efficient for general purpose computing while gpus are more efficient
for deep learning inference. 

Components of gpu like for compute it has cuda cores, tensor cores, and special
function units(SFUs) For memory and caches it has VRAM (Video Random Access Memory)
VRAM is type of DRAM GPU have three level of caches L0, L1, and L2.

L0 is the closest to the compute units, L1 is the closest to the memory, and L2 is
the farthest from the compute units.

Then there is discussion about the different generations of gpus like the latest
VOLTA (2017) to Feynman (2028) generation, and how GPUs have evolved over the years.
It then goes into details of multi instance gpus and how they work and the chapter 
ends with details on local inference.

All in all quite an interesting chapter.
