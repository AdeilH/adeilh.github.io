---
title: "Sycl: Common Parallel Patterns"
description: "Sycl: Common Parallel Patterns"
pubDate: 2026-08-29
tags: []
draft: false
audio: true
---

## Algorithmic Patterns

There are a few common patterns that come up during
parallel programming. Patterns basically help with making
program easier to reason, these patterns can be used to
improve performance for the device and for fine tuning the
for a specific device.

Only algorithmic patterns read Structured Parallel programming
by McCool et al for others.

Patterns here.

1. Map
2. Stencil
3. Reduction
4. Scan Pack/Unpack

### Map

Basically map every input to an output.

Example: Square of Every number in a vector.

### Stencil

This utilizes input and surrounding input to produce a single
output. The inputs are called stencils.

Example: Used in machine vision to compress? an image by utilizing
pixels around a specific pixel.

Ok when it is implemented outside of the input data for example every
output goes to a separate storage it's easier to implement. Otherwise,
it's important to keep track of original value.

1. Small stencils scratchpad of GPUs.
2. Large Stencial CPU caches
3. Small stencils on small input can see performance gains by systolic?
arrays.

### Reduction

As the name suggests it will come up with one output provided a set of
inputs. {1, 5, 6} -> 12 operations are mostly associative and commutative
Tree Reduction is an example. Tuning depends on computing separate data
and combining them.

### Scan

Computes a generalized prefix sum using a binary associative operator,
each element of output rrepresents a partial result.

1. Smaller problems fit for cpu.
2. Larger problems enough data parallelization to saturate GPU.

Like reduction usually a good idea to execute scan op on same device as the
data.

### Pack/Unpack

Related to scan.

#### Pack

1. Pack discards elements based on a boolean condition. Can be precomputed
condition or real time/online condition. Output depends on other output
as it is important to know which outputs were selected before that output.

#### Unpack

1. Unpack data opposite of packing used to fill in data where it doesn't
exist. Contiguous input elements are unpacked input into noncontiguouos
elements.

## Built In Functions And Libraries

1. SYCL Reduction Library

If reduction is initialized using buffers or usm it is scaler, in case of
span it is array

### The reducer class

```cpp

template<typename T, typename BinaryOperation, /*impl defined*/>
class reducer{
  void combine(const T& partial);
};

template<typename T>
auto& operator+=(reducer<T, plus::<T>>&, const T&);

```

combine is implementation defined used to combine data from different work-groups
user defined reductions are only there with trivially copyable types and combination
Functions with no side effects.

## Group Algorithms library

Provides support for parallel patterns.

Naming depends on if an algorithm operates on data where all work-groups know what the
data is and can see all data has joint prefix these algorithms are similar to stl.
If work groups can only look at a span and input and output is work-groups' local
memory then it is modified to include "group"
