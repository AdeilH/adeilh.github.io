---
title: "data parallel C++ Chapter 6 USM"
description: "data parallel C++ Chapter 6 USM"
pubDate: 2026-08-18
tags: []
draft: false
audio: true
---

There are multiple allocation types, host, device, shared,
host is basically assigned to host but is also accessible
from the device. device allocation is only accessible on
device. Shared allocation is available on both but the difference
is that the shared allocation moves between host and device
automatically whereas host allocation is managed manually.

Three types of allocators.

1. C Style malloc() cast and specify length by multiplying with size_of type
2. C++ Style malloc\<type\> only specify length
3. Custom allocators needs N and alloc kind.

## Data Movement

1. Explicit: User makes sure to call the data allocations manually uses memcpy
used for copyting to or from device mainly. Can be difficult to maintain, a source
of bugs. Other two types accessible from both so not needed to be Explicitly copied
2. Implicit data movement is managed by runtime for example you can have host
allocated and shared allocated and use them as needed without memcpy.

### Migration

We can't predict data access patterns by implicit it depends on device and are
impacted by device It provides *fine grained control* sycl provides **prefetch**
and **mem_advice** functions to allow user to give hints to runtime on how
kernels can access data.

Read Device docs for what to do on mem_advice and prefetch what parameters to
pass and how specific device deals with it.

## Queries

Not all device supports USM features.

Two Types.

1. Pointer: What USM pointer points to what device has pointer allocated against.
2. Device: Which USM cpabilities are possessed by device.

### Pointer

1. get_pointer_type(T*, sycl::Context);
2. get_pointer_device(T*, sycl::context).get_info<sycl::info::device::name>();

### Device

1. sycl::aspect::usm_device_allocations (device supports device allocation)
2. sycl::aspect::usm_host_allocations (device supports host allocation)
3. sycl::aspect::usm_atomic_host_allocations_allocations (device supports host allocation
may be atomically modified by the device)
4. sycl::aspect::usm_shared_allocations (device supports shared allocation)
5. sycl::aspect::usm_atomic_shared_allocations (device supports shared but
host and device may concurrently access and atomically modify allocation)
6. sycl::aspect::usm_system_allocations (device supports using system
allocators on device)

## Example

FNV-1a Parallel Checksum simple implementation the expected output is 0xe88ed619

```cpp

#include <cstdint>
#include <iostream>
#include <ranges>
#include <sycl/sycl.hpp>
#include <vector>

// FNV-1a (Fowler–Noll–Vo) hash implementation

namespace FNV {

constexpr std::uint32_t INITIALIZATION_VECTOR = 0x811c9dc5u;
constexpr std::uint32_t PRIME_MULTIPLIER = 0x01000193u;

constexpr std::size_t NUM_CHUNKS = 64;
constexpr std::size_t CHUNK_SIZE = 1024;

static constexpr std::uint32_t fnv1a_step(const std::uint32_t &hash,
                                          const std::uint8_t &byte) {
  return (hash ^ byte) * PRIME_MULTIPLIER;
}
}

int main() {
  sycl::queue q;

  const std::size_t n = FNV::NUM_CHUNKS * FNV::CHUNK_SIZE;
  std::vector<std::uint8_t> data(n);

  for (std::size_t i = 0; i < n; ++i) {
    data[i] = static_cast<std::uint8_t>(
        (i * 2654435761u) >> 24);
  }


  auto* dev_data = sycl::malloc_shared<std::uint8_t>(n, q);
  auto* dev_partial =
      sycl::malloc_shared<std::uint32_t>(FNV::NUM_CHUNKS, q);

  q.memcpy(dev_data, data.data(),
           n * sizeof(std::uint8_t))
      .wait();

  q.parallel_for(FNV::NUM_CHUNKS, [=](sycl::id<1> c) {
     std::uint32_t hash = FNV::INITIALIZATION_VECTOR;
     const std::size_t base = c * FNV::CHUNK_SIZE;
     for (std::size_t i = 0; i < FNV::CHUNK_SIZE; ++i) {
       hash = FNV::fnv1a_step(hash, dev_data[base + i]);
     }
     dev_partial[c] = hash;
   }).wait();

  std::uint32_t total = FNV::INITIALIZATION_VECTOR;
  for (std::uint32_t p : std::views::counted(
           dev_partial,
           static_cast<std::ptrdiff_t>(FNV::NUM_CHUNKS))) {
    total = FNV::fnv1a_step(total,
                       static_cast<std::uint8_t>(p & 0xff));
    total = FNV::fnv1a_step(
        total, static_cast<std::uint8_t>((p >> 8) & 0xff));
    total = FNV::fnv1a_step(
        total, static_cast<std::uint8_t>((p >> 16) & 0xff));
    total = FNV::fnv1a_step(
        total, static_cast<std::uint8_t>((p >> 24) & 0xff));
  }

  std::cout << "FNV-1a checksum: 0x" << std::hex << total
            << std::dec << std::endl;

  sycl::free(dev_data, q);
  sycl::free(dev_partial, q);
  return 0;
}

```
