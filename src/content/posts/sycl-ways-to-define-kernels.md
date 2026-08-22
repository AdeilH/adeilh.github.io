---
title: "Sycl: Ways to define kernels"
description: "Sycl: Ways to define kernels"
pubDate: 2026-08-22
tags: []
draft: false
audio: true
---

Three ways:

1. Lambdas
2. Functors
3. Interoperability (FFI)

## Lambdas

```cpp

// captures then iterates id 
// implicit or explicit

q.submit([&](handler &h){
  h.parallel_for(nd_range({size}, {8}),[=](id<1> i){

  }); 
  h.parallel_for<class Add>(nd_range({size}, {8}),[=](id<1> i){

  });
  // kernels are anon but sometimes we need a name to uniquely
  // identify kernel class add does that.
});

```

Naming a kernel lambda can help host code to know which kernel to
call and runtime to invoke kernel if it was compiled separately.

## Named Function Objects

Named function objects are defined using class and overloading() operator.
Should be trivially copyable byte by byte. So itcan be implicitly copied
to device.

```cpp

template <CanAdd T>
class Add {
  sycl::accessor<T> m_data_acc{};

public:
  Add(sycl::accessor<T> acc) : m_data_acc(acc) {
  }

  void operator()(sycl::id<1> id) {
    m_data_acc[id] = m_data_acc[id] + 1;
  }
};

```

## Kernels in Kernel Bundle

A container for sycl functions or kernels to be used by user,

One of Three States:

1. Input State. (JIT)
2. Object State.
3. Executable state. (AOT)

input to executable state lazily there is an intermediate representation
for providing more portability

```cpp

auto kb = get_kernel_bundle<bundle::state::executable>(
  q.get_context()
);

// use precompiled kernelbundle 

h.use_kernel_budle();

```

for more control wecan ask for kernel bundle for a specific device.

## Interoperability

Covered later (basically calling sycl from other applications like Go)

Reference:

1. Data Parallel C++ Chapter 10
