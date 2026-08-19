---
title: "sycl-buffers"
description: "sycl-buffers"
pubDate: 2026-08-19
tags: []
draft: false
audio: true
---

Buffers are a higher level abstraction. We use accessors to access
the data.

Not tied to a single memory location runtime can use many different
locations but runtime gives consistent view.

## Buffer Template

```cpp

template<typename T, int Dimension, AllocatorT allocator>
class buffer;

```

1. T must be device copyable extends trivially copyable from C++.
2. Dimensions
3. Custom allocator but normal one is used.

### Buffer Creation

```cpp

// 2x5 ints using default allocator
sycl::buffer<int, 2, buffer_allocator<int>> b1(sycl::range<2>(2, 5));

// default allocator and class template argument deduction. CTAD

sycl::buffer<int, 2> b2{sycl::range{2, 5}}

// 20 floats default std::allocator

sycl::buffer<float, 1, std::allocator<float>> b3{sycl::range{20}}

// passedin in allocator

std::allocator<float> m_float_alloc;

sycl::buffer<float, 1, std::allocator<float>> b4{sycl::range{20}, m_float_alloc};

```

We are not passing values because buffer normally can wrap around C++
allocations. -> initialize a double array pass it to buffer, ranges{};

Our responsibility -> don't break this contract -> contract = by passing pointer
to host we make a promisze that we will not try to access host memory during the
lifetime of the buffer.

Buffers can also be made of shared_pointers these help in managing reference count

There can be multiple subbuffers of one buffer but not sub buffer of a szub buffer.

### Sub Buffer

```cpp

sycl::buffer<int, 2> b1{sycl::range{2, 5}};
sycl::buffer b2{b1, syclid(0, 0), sycl::range{1,5}};
sycl::buffer b3{b1, syclid(1, 1), sycl::range{1,5}};

```

### Buffer Properties

1. **use_host_ptr** when present buffer shouldn't allocate on host provided allocators
are ignored must use memory via host pointer passed to constructor helps with minimizing
footprint programmer has full control over host memory.

2. **use_mutex** fine grained memory sharing mutex is passed prefer host unsure
when mutex will change data.

3. **context_bound** takes ref to context object locks the buffer to specified context.
Helpful for debugging by finding out kernel which is doing funny stuff.

updating host memory while destroying buffer is important and it can be done via
weak ptr outputiterator or raw pointer.

## Accessors

read, write, read_write

templated class

5 template parameters.

1. Type
2. Dimensionality defaults to 1.
3. Access Mode defaults to read_write
4. Access Target (device, host_task)
5.

Device -> via device global memory
host_task -> access buffer from host.

Devices have different memory we need to understand them first and look at how
memory is accessed. Divides between workers and work groups. Can be taken from
buffer via get_access method but just better to construct them.

```cpp

sycl::accessor pc{c_buf};

// and in a queue handler

sycl::accessor ac{p_buf, h};

```

placeholder accessor created outside of kernel to use in a kernel use h.require(p_acc)
host_accessor to access on the host, deduction tags

```cpp

accessor abcd{buffer, h, write_only, no_init}

```

1. read_only
2. write_only
3. read_write
4. read_only_host_task
5. read_write_host_task
6. write_only_host_task

no_init lets runtime know that old contents are useless mostly because of stuff.

[] to access [][] for 2d right most unit-stride aka fastest.

So in short

Buffers -> An abstraction
Accessors -> access inside buffer
