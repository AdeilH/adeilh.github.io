---
title: "SYCL: Vectors"
description: "SYCL: Vectors"
pubDate: 2026-08-23
tags: []
draft: false
audio: true
---

## Vector Types as per Author

Convenience type if we want to refer to and operate
on a group rgb, xyz.

For GPU Devs

How code maps to SIMD example given is that float8 could map
to an eight lant SIMD instruction in hardware.

For Cpu Devs

### Mental Model for SYCL Vector Types

Multiple work items grouped together by compiler premise of SPMD
single program multiple data think of compiler as always vectorizing
across work items while mapping SIMD in SPMD style program.

Sycl vector types local to work group we can add two vectors in a single
opertion as opposed to performing four scalar ops which the compiler
will do

Implicit vectorization occurs in many compilers. for loops honor vector
types etc.

We will discuss convenience type of vector as usage.

## Math Array (marray)

Sycl 2020 has a specific vector type math array as convenience array
so it's easier to reason how to implement.

example

```cpp

// same for other types
marray<int8_t, N>

```

it provides + - and other operations like sin cos etc convencience from
sycl

```cpp

queue q;
marray<float, 4> input {1.000f,2.00f, 3.00f, 4.00f}
marray<float, 4> res {M}
  // do ops

```

## Sycl Vector Type

Compatible with both gpu (xyz, rgb) or cpu (code mapping to simd)

Use marray instead only in three cases.

1. Vector Loads and Stores
2. Interoperability with backend-native vector types.
3. Ops called swizzles.

### Loads and Stores

```cpp

h.parallel_for(N, [=](sycl::id<1> id){
    syc::float16 inpf16;
  inpf16.load(idx, acc.get_multi_ptr<sycl::access::decorated::no>());
  // same for stores
});

```

abstraction for vector operations.
don't expect vector load and store to map to simd but can still help
to improve memory bandwidth utilization

### Interoperability

Can be constructed with vector_t which is backend native vector defined.

### Swizzle Ops

In GUI Apps swizzling means rearranging data elements of a vector

Swizzle member template functions of sycl allows us to perform swizzle ops.

return type is always __swizzled_vec__ swizzle() const;

```cpp

e.xyzw() //can be performed by calling a vector member equivalent to the swizzle
// that we need

```

## How Vector Types Execute

As Conv Types:

1. think of multiple workitems combining to create a hardware instructions.
2. due to 1 think of execution per channel or per element in time
3. compilers have to keep the memory layout guaranteed so it's good to pass
proper types for helping compilers optimize.

example

work item id         ``w0  w1  w2 .....``
simd hw inst lanes   ``x[w0] x[w1] x[w2] ...``

similar for 2 d right and down

downside of work item centric vector data layout is that if a compiler optimizes
across multiple work-items the    memory layout is not consecutive because vecs\
are contiguous and work items operate on different vecs in paralel.

Compiler can do aggressive optimizations like transposing y4 etc.

## Vector as SIMD Types

with devices that allow performing ops on multiple data on single instruction.
Example can be a basic vector add.
