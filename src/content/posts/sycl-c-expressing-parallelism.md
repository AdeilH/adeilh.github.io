---
title: "Sycl C++ Expressing Parallelism"
description: "Sycl C++ Expressing Parallelism"
pubDate: 2026-08-05
tags: []
draft: false
audio: true
---

Moving from loops to kernel based thinking is important a parallel
kernel is not a loop and doesn't have iteratns instead it works on
data parallel way and multiple instances of that operation are
executed.

## Multidimensional Kernels

Think of it as an abstraction over 2D 3D data which maybe 1D data
another consideration is if memory is contigous or not.

-> Contiguous
1 | 2 | 3 | 4 ↓ non Contiguous
5 | 6 | 7 | 8

if it's more than 3d then user must specifiy mapping between multiple
dimensions and linear indices manually using modulo arithmetic or
another method.

## Overview of Language Features

Different types of kernel what we want, what we need we can express in
different ways.

### Separating Kernels from Host Code

We use lambda expressions like defined in previous chapters.

### Different Types of Parallel Kernels

Three Types.

1. Basic Data Parallel Kernels-> easier to understand and reason we give
up more access to low level features like scheduling, increased complexity
difficult to reason about their performance.

2. Extends Basic called ND-range N Dimensional useful for low level performance
tuning. It enables certain kernel instances to be grouped together.

3. Referred as Hierarchical data experimental syntax of second form syntax similar
to nested parallel loops.
