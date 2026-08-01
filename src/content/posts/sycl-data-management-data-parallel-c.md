---
title: "Sycl: Data Management -> Data Parallel C++"
description: "Sycl: Data Management -> Data Parallel C++"
pubDate: 2026-07-30
tags: []
draft: false
audio: true
---

## Introduction

So there are two ways to manage memory Unified Share Memory or
USM and buffers.

Managing memory can be explicit or implicit that is we can use
memCpy etc or we can use sycl runtime. One provides full control over
data management and drawback as it is in C sometimes that
the memory usage like this is error prone. For implicit data
movement is managed by sycl runtime it's better in terms of being
error prone but also the drawback is we have lesser control.

### What's Best

As the saying goes "it depends" sometimes you can use both sometimes
you can use implicit for development and explicit in case performance
gains are needed.

### Abstractions

There are three Abstractions: USM, buffers, images.

- USM is similar to pointers in C/C++.
- Buffers describe 1D 2D or 3D arrays. Used through accessors.
- Images are like buffers but provide more stuff for image processing.

#### Unified Shared Memory USM

So basically like pointers if you are familiar with malloc you will understand
USM. Three different typesz of allocation device (not on host), host(on both), shared
(moves back and forth) in terms of accessibility.

- Device allocation in attached device's memory not for host.
- Host allocation in host's memory for both.
- Shared similar to host but data moves back and forth

USM supports both explicit and implicit data movement strategies.

Explicit is achieved with device allocations and special memcpy() ops from host to
device and device to host.

```cpp

constexpr  int N = 42;
    void explicit_data_movement_usm() {
        sycl::queue q;
        std::array<int, N> host_array{};
        int *device_array = sycl::malloc_device<int>(N, q);

        q.submit([&](sycl::handler &h) {
            h.memcpy(device_array, &host_array[0], N * sizeof(int));
        });
        q.wait();

        q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i) {
                device_array[i]++;
            });
        });
        q.wait();

        q.submit([&] (sycl::handler &h) {
            h.memcpy(&host_array[0], device_array, N * sizeof(int));
        });
        q.wait();

        free(device_array, q);

       std::println("{}", 
                    std::ranges::fold_left(host_array.begin(), host_array.end(),
                                           0, std::plus())
                    );
    }

```

Implicit isn't controlled by the programmer and used make it easier to move
memory around.

```cpp

    void implicit_data_movement_usm() {
        // queue
        sycl::queue q{};
        int * host_array = sycl::malloc_host<int>(N, q);
        int * shared_array = sycl::malloc_shared<int>(N, q);
        for (auto i: std::views::iota(0, N)) {
            host_array[i] = 0;
        }

        q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i) {
                shared_array[i] = host_array[i] + 1;
            });
        });
        q.wait();

        for (auto i: std::views::iota(0, N)) {
            host_array[i] = shared_array[i];
        }

        std::println("{}", 
                     std::ranges::fold_left(&host_array[0], &host_array[N], 0, std::plus())
                     );

        free(host_array, q);
        free(shared_array, q);

    }

```

#### Buffers

Buffers provide an abstraction over different C++ types can scalar, vector
or user defined. Device Copyable expands on trivially copyable with std::array,
std::pair, std::tuple, std::span. Buffers represent data objects so they can't
be accessed directly. Accessed through accessor built with number of obkjects.
Data is copied during buffer construction.

```cpp

    void buffer_management() {
        std::array<int, N> my_data{};
        {
            sycl::queue q{};
            sycl::buffer my_buffer(my_data);

            q.submit([&](sycl::handler &h) {
                sycl::accessor<int> device_accessor(my_buffer, h);
                h.parallel_for(N, [=](sycl::id<1> i) {
                    device_accessor[i]++;
                });
            });
            q.wait();
            sycl::host_accessor host_accessor(my_buffer);
        }

        std::println("{}", 
                     std::ranges::fold_left(my_data.begin(), my_data.end(), 0, std::plus())
                     );
        }

```

Date: 01-08-2026

#### Access Modes

There are 3 access modes.

1. Read
2. Write
3. Read_Write

default access mode is read_write. read mode tells runtime that data
needs to be available on device before kernel begins execution write
mode tells that we will modify and may need to copy back the buffer.

Sometimes there is need for execution in specific order for example
a needs to complete before b it's call dependence. We can form a
DAG (directed Acyclic Graph)
   ↓ A ↓   E
   B   C   ⬇️
   ↘ D ↙️  F

Launch of kernel can be in two ways in order or any order.

In order useful when bringing up apps.

```cpp
    
    void in_order_queues() {
        sycl::queue q{sycl::property::queue::in_order()};
        auto s = sycl::property::queue::in_order();
        int * host_array = sycl::malloc_host<int>(N * sizeof(int), q);
        int * device_array = sycl::malloc_device<int>(N * sizeof(int), q);

        for (int i =0; i < N; i++) {
            host_array[i] = 0;
        }

        q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i) {
                device_array[i] = host_array[i] + 1;
            });
        });
        q.wait();

        q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i) {
                host_array[i] = device_array[i] + 1;
            });
        });
        q.wait();

        std::println("{}", std::ranges::fold_left(&host_array[0], &host_array[N], 0, std::plus()));
    }

```

Out of order queues these deps can be specified using lambda which are
called command groups with only handler as their input parameters

```cpp

    void out_of_order_queues() {
        sycl::queue q;
        auto eA = q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i){});
        });
        eA.wait();
        auto eB = q.submit([&](sycl::handler &h) {
            h.parallel_for(N, [=](sycl::id<1> i){});

        });
        auto eC = q.submit([&](sycl::handler &h) {
            h.depends_on(eB);
            h.parallel_for(N, [=](sycl::id<1> i){});

        });

        auto eD = q.submit([&](sycl::handler &h) {
            h.depends_on({eB, eC});
            h.parallel_for(N, [=](sycl::id<1> i){});
        });

    }

```

#### Implicit Deps with Accessors

Read After Write (RAW)
Write After Read (WAR)
Write After Write (WAW)

```cpp

    void implicit_deps() {
        std::array<int, N> a{}, b{}, c{};

        sycl::queue q;

        sycl::buffer buffer_a(a);
        sycl::buffer buffer_b(b);
        sycl::buffer buffer_c(c);

        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_a(buffer_a, h, sycl::read_only);
            sycl::accessor acc_b(buffer_a, h, sycl::write_only);
            h.parallel_for(N, [=](sycl::id<1> i) {
                acc_b[i] = acc_a[i] + 1;
            });
        });

        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_a(buffer_a, h, sycl::read_only);
            h.parallel_for(N, [=](sycl::id<1> i) {
                int data = a[i];
            });
        });

        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_b(buffer_b, h, sycl::read_only);
            sycl::accessor acc_c(buffer_c, h, sycl::write_only);
            h.parallel_for(N, [=](sycl::id<1> i) {
                acc_c[i] = acc_b[i] + 2;
            });
        });

        sycl::host_accessor host_acc(buffer_c, sycl::read_only);

        auto output = std::ranges::fold_left(&host_acc[0], &host_acc[N], 0, std::plus());

        std::println("{}", output);
    }

    void implicit_deps_war_waw() {
        sycl::queue q;
        std::array<int, N> a{}, b{};

        sycl::buffer buffer_a(a);
        sycl::buffer buffer_b(b);

        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_a(buffer_a, h, sycl::read_only);
            sycl::accessor acc_b(buffer_b, h, sycl::write_only);

            h.parallel_for(N, [=](sycl::id<1> i) {
                acc_b[i] = acc_a[i];
            });
        });
        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_a(buffer_a, h, sycl::write_only);
            h.parallel_for(N, [=](sycl::id<1> i) {
                acc_a[i] = 222;
            });
        });
        q.submit([&](sycl::handler &h) {
            sycl::accessor acc_b(buffer_b, h, sycl::write_only);
            h.parallel_for(N, [=](sycl::id<1> i) {
                acc_b[i] = acc_b[i] + 1;
            });
        });

        sycl::host_accessor acc_a_host(buffer_a, sycl::read_only);
        sycl::host_accessor acc_b_host(buffer_b, sycl::read_only);

        auto sum_a = std::ranges::fold_left(&acc_a_host[0],&acc_a_host[N],0, std::plus());
        auto sum_b = std::ranges::fold_left(&acc_b_host[0],&acc_b_host[N],0, std::plus());

        std::println("sum of A is: {} sum of B is: {}", sum_a, sum_b );
    }

```

## Choosing Data Management strategies

1. More Control USM
2. Easier to Begin Buffers
3. Kernel dependency Buffers Computation deps USM
