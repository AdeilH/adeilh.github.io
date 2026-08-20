---
title: "Sycl Scheduling"
description: "Sycl Scheduling"
pubDate: 2026-08-20
tags: []
draft: false
audio: true
---

## Graph Scheduling

### Kernel Dependences

Kernels dependence depends on the data it can access. These form the
graphs.

A command group has three things.

1. Action
2. Dependences
3. Misc host code

Types of Action by command group(passed to submit as lambdas)

1. Kernel Execution.
2. Explicit memory operations.

#### How dependences work

1. In order, like a queue works one after other.
2. Event based **depends_on** method passed through lambda and vector of events
or single event
3. Accessors based they specify how data will be read and write

### Examples

Initialize ➡ reduce

InitializeA ▶ Vector Add -> Reduce
InitializeB

```cpp

// 1. In Order 
queue q{property::queue::in_order()}

// 2 events based...

h.depends_on(event);

// 3 Accessors based

sycl::Accessors
sycl::host_accessor // like previous chapter

```

### New things

1. queue.single_task (used to specify task on queue)
2. Multiple patterns
3. In Order queue

#### Example From Book

```cpp

void vector_of_events() {
  sycl::queue m_queue;

  int* data1 = sycl::malloc_shared<int>(N, m_queue);
  int* data2 = sycl::malloc_shared<int>(N, m_queue);

  auto e1 = m_queue.parallel_for(N,
                       [=](sycl::id<1> i) {
                         data1[i] = 1;
                       });
  auto e2 = m_queue.parallel_for(N,
                       [=](sycl::id<1> i) {
                         data2[i] = 1;
                       });
  auto e3 = m_queue.parallel_for(N, {e1, e2},
                       [=](sycl::id<1> i) {
                         data1[i] += data2[i];
                       });

  m_queue.single_task([=]() {
    for (int i : std::views::iota(0, N)) {
      data1[0] /= 3;
    }
  });
  m_queue.wait();
  assert(data1[0] == N);
}

```

### When command group parts are executed?

Task Graphs -> async execution depends on dependences
what happens on host submit returns to host and executed only once rest
enqueued for device.

## Data Movement

### Explicit

USM -> mem_cpy
Buffers -> copy or update_host (if buffer was created by host
pointer this method copies data represented by accessor back to the host)

### Implicit

USM -> Host and Shared Allocations as mentioned (Host doesn't really move mostly
access it remotely) some nuances pre_fetch works like mem_cpy hints vs must copy

Buffers -> Nuance Command groups must construct accessors for buffers specify how
data will be used.

#### Example

```cpp

sycl::accessors m_acc{m_buffer, sycl::read_only}

```

## Synchronize with the Host

Different methods like waiting on a queue wait and wait_and_threow

Synchronize on events wait on even or static method wait on event

Another method is accessors and host_accessors (make data remain on host
till they are destroyed)

Buffer has extra properties like use_mutex use_host_ptr, context_bound
when created with use_mutex it creates a requirement that buffer sends/rcv
host memory.
