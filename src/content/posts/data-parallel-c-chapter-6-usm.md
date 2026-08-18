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

Basic Matrix Multiplication example using USM

```cpp

#include <iostream>
#include <vector>
#include <sycl/sycl.hpp>

int main() {
    sycl::queue q;
    std::cout << "Device: " << q.get_device().get_info<sycl::info::device::name>() << "\n";

    // 1. Define dimensions for a square matrix (N x N)
    constexpr size_t N = 16;
    size_t matrix_size = N * N;

    // 2. Allocate USM shared memory (accessible by host CPU and device GPU)
    float* A = sycl::malloc_shared<float>(matrix_size, q);
    float* B = sycl::malloc_shared<float>(matrix_size, q);
    float* C = sycl::malloc_shared<float>(matrix_size, q);

    // 3. Initialize matrices on the host using the USM pointers directly
    for (size_t i = 0; i < N; ++i) {
        for (size_t j = 0; j < N; ++j) {
            A[i * N + j] = 1.0f; // Fill Matrix A with 1s
            B[i * N + j] = 2.0f; // Fill Matrix B with 2s
            C[i * N + j] = 0.0f; // Clear output matrix
        }
    }

    // 4. Launch a 2D parallel kernel
    q.parallel_for(sycl::range<2>(N, N), [=](sycl::id<2> item) {
        size_t row = item[0];
        size_t col = item[1];
        
        float sum = 0.0f;
        for (size_t k = 0; k < N; ++k) {
            sum += A[row * N + k] * B[k * N + col];
        }
        
        C[row * N + col] = sum;
    }).wait(); // Block host execution until the GPU completes the work

    // 5. Verify the result (Every element should be 1.0 * 2.0 * N = 32.0f)
    std::cout << "Result C[0][0]: " << C[0] << " (Expected: " << (1.0f * 2.0f * N) << ")\n";

    // 6. Free allocated USM storage
    sycl::free(A, q);
    sycl::free(B, q);
    sycl::free(C, q);

    return 0;
}


```
