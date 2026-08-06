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

Date: 2026-08-06

### The Basic Kernel

#### The Range Class

Templatized defining dimensions of the range can be 1d 2d 3d both execution ranges
of parallel constructs and sizes of buffers.

```cpp
template<int Dmensions=1>
class Range{};

```

#### The ID Class

Same as range class but argument to a kernel function must be forwarded to any where
we want to query the index.

#### The Item Class

ID class only provides index in the range that it is computing if we want to know
about range and id both we need item class.

```cpp

template<int Dimensions = 1, bool WithOffset = true> 
class item{};

```

### The ND Range Kernel

Not flat anymore items belong to groups some sort of locality different
behaviours for different groups gives more insight on how work is
mapped to specific hardware platforms.

#### Work-Items

Individual instances of kernel functions

#### Work groups

Work Items are organized in work groups and work items in different work
groups cannot communicate.

-> work item in work groups -> work group local memory
-> work item can synchronize using work group barriers and work group memory fences
-> work item in work groups -> access to group functions

#### Sub-Groups

subset of work items in work groups sub groups can utilize  compiler vectorization
SIMD register each work-item in subgroup corresponds to SIMD lane.

#### The nd_range Class

two instances denoting local and global execution range

#### The nd_item Class

Again encapsulating the execution range of a kernel

#### The group Class

maps all functionality to work groups.

#### The sub_group Class

same as groups for sub groups.

### Mapping Computation to Work-Items

Mapping can be improved.

- One-to-One Mapping -> size matching amount of work
- Many-to-One mapping -> not amount of work but number of workers

### Choosing a kernel form

Flow Chart describes it in the book basically goes like first
parallel language use basic kernel if implementation does not
exists -> prototype -> basic kernel if it exists and language
is OpenCL or Cuda ND-Range Kernel other language embarrasingly
parallel basic development performance nd range productivity basic
data locality re-use yes nd range no basic_kernel
