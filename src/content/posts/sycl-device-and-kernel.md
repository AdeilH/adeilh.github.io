---
title: "Sycl: Device and Kernel"
description: "Sycl: Device and Kernel"
pubDate: 2026-08-24
tags: []
draft: false
audio: true
---

Sycl provides a way to have more granular or fine access to the
hardware as sometimes you might need to specialize a kernel for
a specific hardware. There are many methods that the user can use
to find perfect solution for their hardware.

Types of kernel code.

1. Generic: runs anywhere
2. Device_Types: run on a device and tuned to specific model.
3. Tuned Device Type Kernel: tuned from very small amount to detailed
optimizations.

Better to write separate kernels if we are using different algos rather
than parameterizing.

1. Finding Device Name

```cpp

  sycl::queue m_queue{sycl::cpu_selector_v};

  std::println("{}", m_queue.get_device().get_info<sycl::info::device::name>());

  sycl::queue m_queue2{sycl::gpu_selector_v};

  std::println("{}", m_queue2.get_device().get_info<sycl::info::device::name>());

```

Setting gpu or cpu doesn't guarantee that it will run on that specific device.
What if gpu isn't present what if there are multiple gpus.

## Aspects

Sycl aspectsare a list of capabilities of a device? like a device has them or
doesn't have them it's sort of a boolean.

### Examples

aspect::cpu
aspect::gpu
aspect::custom
aspect::accelerator
aspect::emulated

And more depending on the device.

## get_info<>

```cpp

for (auto const& this_platform: sycl::platform::get_platforms()) {
    std::println("{}", this_platform.get_info<sycl::info::platform::name>());
    for (auto const& device: this_platform.get_devices()) {
      std::println("{}", device.get_info<sycl::info::device::name>());
}

```

## Device Specific kernel info descriptors

Conditions and Informations (Correctness vs useful for tuning can be incorrect)

### For Correctness

#### Device Queries

1. max_work_item_sizes
2. max_work_group_size
3. global_mem_size
4. local_mem_size
5. max_compute_units
6. sub_group_sizes

#### Kernel Queries

1. work_group_size
2. compile_work_group_size
3. compile_sub_group_size
4. compile_num_sub_groups
5. max_sub_group_size
6. max_num_sub_groups

### For Tuning/optimizations

#### Device Queries For Tuning

1. global_mem_cache_line_size
2. global_mem_cache_size
3. local_mem_type local(SRAM ) vs global(abstraction)

#### Kernel Queries For Tuning

1. preferred_work_group_size
2. preferred_work_group_size_multiple

for best performance work group size shouldn't be greater than this.

## Runtime VS Compile-Time Properties

most of the things discussed are runtime attributes there can be compile
time attributes we can specialize kernel by writing different for different
devices.

### Attributes

1. device_has(aspect, ...)
2. reqd_work_group_size(dim0) -> must
3. reqd_work_group_size(dim0, dim1)
4. reqd_work_group_size(dim0, dim1, dim2)
5. work_group_size_hint(dim0) -> hint compiler
6. reqd_sub_group_size(dim0)

#### Example of Attributes

```cpp

if (m_queue.get_device().has(sycl::aspect::fp64)) {
    // kernel 1 impl
  } else {
    // different impl
  }

```
